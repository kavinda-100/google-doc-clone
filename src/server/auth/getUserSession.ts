import { headers } from "next/headers";
import { auth } from "./auth";

export const getUserSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
