export const DEMO_COOKIE = "arrise_demo_session";
export const DEMO_PASSWORD = "CanvasDemo2026!";

export type DemoRole =
  | "student"
  | "mentor"
  | "faculty"
  | "staff"
  | "hod"
  | "coordinator"
  | "institution_admin"
  | "ca_accounts"
  | "saas_super_admin";

export type DemoUser = {
  id: string;
  fullName: string;
  email: string;
  role: DemoRole;
  institution: string;
};

export type DemoAccount = DemoUser & {
  password: string;
  label: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-student",
    fullName: "Alex Morgan (Demo Student)",
    email: "student@demo.arrisecanvas.com",
    role: "student",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "Student",
  },
  {
    id: "demo-mentor",
    fullName: "Taylor Reed (Demo Mentor)",
    email: "mentor@demo.arrisecanvas.com",
    role: "mentor",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "Mentor",
  },
  {
    id: "demo-faculty",
    fullName: "Jordan Lee (Demo Faculty)",
    email: "faculty@demo.arrisecanvas.com",
    role: "faculty",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "Faculty",
  },
  {
    id: "demo-staff",
    fullName: "Casey Patel (Demo Staff)",
    email: "staff@demo.arrisecanvas.com",
    role: "staff",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "Staff",
  },
  {
    id: "demo-hod",
    fullName: "Morgan Shah (Demo HOD)",
    email: "hod@demo.arrisecanvas.com",
    role: "hod",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "HOD",
  },
  {
    id: "demo-coordinator",
    fullName: "Riley Das (Demo Coordinator)",
    email: "coordinator@demo.arrisecanvas.com",
    role: "coordinator",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "Coordinator",
  },
  {
    id: "demo-admin",
    fullName: "Avery Nair (Demo Institution Admin)",
    email: "admin@demo.arrisecanvas.com",
    role: "institution_admin",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "Institution Admin",
  },
  {
    id: "demo-ca-accounts",
    fullName: "Sam Rivera (Demo Accounts)",
    email: "accounts@demo.arrisecanvas.com",
    role: "ca_accounts",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "CA / Accounts",
  },
  {
    id: "demo-saas-super-admin",
    fullName: "Alex Kim (Demo SaaS Admin)",
    email: "superadmin@demo.arrisecanvas.com",
    role: "saas_super_admin",
    institution: "Static Preview Institution",
    password: DEMO_PASSWORD,
    label: "SaaS Super Admin",
  },
];

export const ROLE_LABELS: Record<DemoRole, string> = {
  student: "Student",
  mentor: "Mentor",
  faculty: "Faculty",
  staff: "Faculty / Staff",
  hod: "Head of Department",
  coordinator: "Coordinator",
  institution_admin: "Institution Admin",
  ca_accounts: "CA / Accounts",
  saas_super_admin: "SaaS Super Admin",
};

export function authenticateDemo(
  email: string,
  password: string
): DemoUser | null {
  const account = DEMO_ACCOUNTS.find(
    (candidate) =>
      candidate.email.toLowerCase() === email.trim().toLowerCase() &&
      candidate.password === password
  );
  if (!account) return null;
  return {
    id: account.id,
    fullName: account.fullName,
    email: account.email,
    role: account.role,
    institution: account.institution,
  };
}

export function encodeDemoSession(user: DemoUser): string {
  return encodeURIComponent(JSON.stringify(user));
}

export function decodeDemoSession(
  value: string | undefined | null
): DemoUser | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<DemoUser>;
    if (
      parsed &&
      typeof parsed.email === "string" &&
      typeof parsed.fullName === "string" &&
      typeof parsed.role === "string"
    ) {
      return parsed as DemoUser;
    }
    return null;
  } catch {
    return null;
  }
}
