export const BRAND = {
  orange: "#FF6B00",
  orangeHover: "#D95B00",
  yellow: "#FFB15C",
  black: "#0D0D0D",
  white: "#F5F5F5",
  surface: "#FFFFFF",
  elevated: "#EDEDED",
  border: "#E5E5E5",
  muted: "#525252",
  success: "#2E9E6B",
  warning: "#C99A2E",
  error: "#B42318",
} as const;

export const ROLES = {
  STUDENT: "student",
  MENTOR: "mentor",
  FACULTY: "faculty",
  STAFF: "staff",
  HOD: "hod",
  COORDINATOR: "coordinator",
  INSTITUTION_ADMIN: "institution_admin",
  CA_ACCOUNTS: "ca_accounts",
  SUPER_ADMIN: "saas_super_admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const FILE_TYPES = {
  PDF: "pdf",
  DOCX: "docx",
  PPTX: "pptx",
  IMAGE: "image",
  VIDEO: "video",
  OTHER: "other",
} as const;

export const SUPPORTED_MIME_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "image/png": "image",
  "image/jpeg": "image",
  "image/webp": "image",
  "image/gif": "image",
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB