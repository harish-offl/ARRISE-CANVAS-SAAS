import { createServerSupabaseClient, isSupabaseConfigured } from "./supabase";
import type { Profile } from "../types";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  profile: Profile;
};

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error(`Unable to load the authenticated user's profile: ${profileError.message}`);
  }
  if (!profile || typeof profile.role !== "string" || !profile.role.trim()) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || "",
    role: profile.role,
    profile,
  };
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await getAuthUser();
  if (!user || !allowedRoles.includes(user.role)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export async function signOut() {
  if (!isSupabaseConfigured()) return;
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
}