"use server";

import { auth } from "../../auth";
import { revalidatePath } from "next/cache";
import { db } from "../server/db";
import { docTemplates } from "../constans/docsTemplats";

export async function getDocs() {
  try {
    // Check if the user is logged in
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    // Get all documents of the user
    const documents = await db.document.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      documents,
    };
  } catch (e: unknown) {
    console.log("Error in getDocs: ", e);
    throw new Error("Internal Server Error");
  }
}

export const getDocContent = async ({ id }: { id: string }) => {
  try {
    // Check if the user is logged in
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    // Check if the document exists
    const document = await db.document.findUnique({
      where: { id },
    });
    if (!document) {
      throw new Error("Document not found");
    }
    return {
      success: true,
      document,
    };
  } catch (e: unknown) {
    console.log("Error in getDocContent: ", e);
    throw new Error("Internal Server Error");
  }
};

export async function createNewDoc({ id }: { id: string | null }) {
  try {
    // Check if the user is logged in
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    if (id) {
      // Check if the document exists
      const document = docTemplates.find((doc) => doc.id === id);
      if (!document) {
        throw new Error("Document not found");
      }
      // Create a new document
      const newDoc = await db.document.create({
        data: {
          name: document.templateName,
          content: document.templateContent,
          userId: session.user.id!,
        },
      });
      if (!newDoc) {
        throw new Error("Error in creating document");
      }
      return {
        success: true,
        message: "Document created successfully",
        docId: newDoc.id,
      };
    } else {
      // Create a new document
      const newDoc = await db.document.create({
        data: {
          name: "Untitled Document",
          content: "",
          userId: session.user.id!,
        },
      });
      if (!newDoc) {
        throw new Error("Error in creating document");
      }
      return {
        success: true,
        message: "Document created successfully",
        docId: newDoc.id,
      };
    }
  } catch (e: unknown) {
    console.log("Error in createNewDoc: ", e);
    throw new Error("Internal Server Error");
  }
}

export async function renameDoc({ id, name }: { id: string; name: string }) {
  try {
    // Check if the user is logged in
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    // Check if the document exists
    const document = await db.document.findUnique({
      where: { id },
    });
    if (!document) {
      throw new Error("Document not found");
    }
    // Update the document name
    const updatedDoc = await db.document.update({
      where: { id },
      data: { name },
    });
    if (!updatedDoc) {
      throw new Error("Error in updating document");
    }
    return {
      success: true,
      message: "Document renamed successfully",
    };
  } catch (e: unknown) {
    console.log("Error in renameDoc: ", e);
    throw new Error("Internal Server Error");
  }
}

export async function deleteDocument({ id }: { id: string }) {
  try {
    // Check if the user is logged in
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    // Check if the document exists
    const document = await db.document.findUnique({
      where: { id, userId: session.user.id },
    });
    if (!document) {
      throw new Error("Document not found");
    }
    // Delete the document
    await db.document.delete({
      where: { id, userId: session.user.id },
    });
    revalidatePath("/dashboard", "page");
    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (e: unknown) {
    console.log("Error in deleteDocument: ", e);
    throw new Error("Internal Server Error");
  }
}

export async function saveDocContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  try {
    // Check if the user is logged in
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    // Check if the document exists
    const document = await db.document.findFirst({
      where: { id, userId: session.user.id },
    });
    if (!document) {
      throw new Error("Document not found");
    }
    // Update the document content
    const updatedDoc = await db.document.update({
      where: { id, userId: session.user.id },
      data: { content },
    });
    if (!updatedDoc) {
      throw new Error("Error in updating document");
    }
    return {
      success: true,
      message: "Document content saved successfully",
    };
  } catch (e: unknown) {
    console.log("Error in saveDocContent: ", e);
    throw new Error("Internal Server Error");
  }
}
