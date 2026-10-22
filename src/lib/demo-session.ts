import { cookies } from "next/headers";
import { DEMO_COOKIE, decodeDemoSession, type DemoUser } from "./demo-auth";

export async function getDemoUser(): Promise<DemoUser | null> {
  const cookieStore = await cookies();
  return decodeDemoSession(cookieStore.get(DEMO_COOKIE)?.value);
}
