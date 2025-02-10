"use server";

import { getUserSession } from "../server/auth/getUserSession";
import { docTemplates } from "../constans/docsTemplats";
import { db } from "../server/db";

export async function createNewDoc({ id }: { id: string }) {
  try {
    // Check if the user is logged in
    const session = await getUserSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
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
        userId: session.user.id,
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
  } catch (e: unknown) {
    console.log("Error in createNewDoc: ", e);
    throw new Error("Internal Server Error");
  }
}
