export type Subject = {
  id: string;
  name: string;
  code: string;
  term: string;
  instructor: string;
  overview: string;
  units: Unit[];
  materialsCount: number;
  assignmentsCount: number;
  quizzesCount: number;
  announcements: Announcement[];
};

export type Unit = {
  id: string;
  name: string;
  order: number;
  topics: Topic[];
};

export type Topic = {
  id: string;
  name: string;
  order: number;
  materials: Material[];
};

export type Material = {
  id: string;
  title: string;
  description: string;
  type: string;
  subjectId: string;
  unitId: string;
  topicId: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  published: boolean;
  folder?: string;
  downloads: number;
  completed: boolean;
};

export type Assignment = {
  id: string;
  title: string;
  subjectId: string;
  instructions: string;
  dueDate: string;
  attachments: string[];
  maxScore: number;
  submissionFormats: string[];
  status: "pending" | "submitted" | "graded" | "overdue";
  submittedAt?: string;
  grade?: number;
  feedback?: string;
};

export type Quiz = {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
  maxAttempts: number;
  availableFrom?: string;
  availableUntil?: string;
  status: "not_started" | "in_progress" | "completed";
  score?: number;
  attempts: Attempt[];
};

export type Question = {
  id: string;
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
};

export type Attempt = {
  id: string;
  score: number;
  total: number;
  submittedAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  subjectId: string | null;
  author: string;
  authorRole: string;
  createdAt: string;
  pinned: boolean;
};

export type Notification = {
  id: string;
  type: "material" | "assignment" | "quiz" | "announcement" | "grade" | "system";
  title: string;
  description: string;
  referenceId?: string;
  read: boolean;
  createdAt: string;
};

export type Bookmark = {
  id: string;
  materialId: string;
  title: string;
  type: string;
  subjectId: string;
  savedAt: string;
};

export type StudySession = {
  id: string;
  subjectId: string;
  topicId: string;
  date: string;
  duration: number;
  notes: string;
};

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  institutionId?: string;
  avatarUrl?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
};

export type Institution = {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: string;
};

export type Department = {
  id: string;
  name: string;
  institutionId: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  institutionId: string;
  term: string;
  faculty: string[];
  enrolled: number;
};

export type AuditLog = {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  ip?: string;
};