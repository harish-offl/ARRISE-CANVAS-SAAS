"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  Inbox,
  LayoutDashboard,
  MailOpen,
  MessageSquare,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type Section =
  | "overview"
  | "courses"
  | "assignments"
  | "materials"
  | "calendar"
  | "inbox"
  | "notifications"
  | "help";

type CalendarEventCategory = "assignment_due" | "assignment_opens" | "discussion";

const courses = [
  {
    id: "data-science",
    title: "Introduction to Data Science",
    code: "DS101",
    instructor: "Dr. Priya Shah",
    description: "Explore data, ask better questions, and learn the foundations of analysis.",
    next: "Working with datasets",
  },
  {
    id: "academic-writing",
    title: "Academic Writing",
    code: "ENG204",
    instructor: "Prof. Daniel Lee",
    description: "Build clear arguments and communicate research with confidence.",
    next: "Structuring your argument",
  },
  {
    id: "design-thinking",
    title: "Design Thinking Studio",
    code: "DES110",
    instructor: "Ms. Aisha Patel",
    description: "Use research and prototyping to turn real needs into useful ideas.",
    next: "Prototype and test",
  },
];

const assignments = [
  {
    id: "dataset-reflection",
    title: "Dataset reflection",
    course: "Introduction to Data Science",
    due: "Oct 24, 2026",
    dueDate: new Date(2026, 9, 24),
    category: "assignment_due" as const,
    description: "Choose a small dataset and describe two questions it could help answer.",
  },
  {
    id: "argument-outline",
    title: "Argument outline",
    course: "Academic Writing",
    due: "Oct 28, 2026",
    dueDate: new Date(2026, 9, 28),
    category: "assignment_due" as const,
    description: "Submit a one-page outline with a thesis, supporting claims, and sources.",
  },
  {
    id: "prototype-notes",
    title: "Prototype test notes",
    course: "Design Thinking Studio",
    due: "Nov 2, 2026",
    dueDate: new Date(2026, 10, 2),
    category: "assignment_due" as const,
    description: "Record what you learned from one prototype test and what you would change.",
  },
];

const materials = [
  {
    id: "data-guide",
    title: "Getting started with datasets",
    course: "Introduction to Data Science",
    kind: "Reading · 8 min",
    description: "A short guide to finding columns, spotting missing values, and asking useful questions of a dataset.",
  },
  {
    id: "writing-checklist",
    title: "Essay planning checklist",
    course: "Academic Writing",
    kind: "Study guide · 2 pages",
    description: "A practical checklist for planning a focused thesis, ordering evidence, and revising a draft.",
  },
  {
    id: "prototype-video",
    title: "From sketch to prototype",
    course: "Design Thinking Studio",
    kind: "Video · 12 min",
    description: "A demo lesson showing how to turn a quick sketch into a prototype you can test with learners.",
  },
];

const demoMessages = [
  {
    id: "welcome",
    sender: "Student Support",
    subject: "Welcome to your Canvas demo",
    date: "Oct 20, 2026",
    body: "This sample inbox shows where course and institution messages would appear. Replies are not sent from this public demo.",
  },
  {
    id: "writing-workshop",
    sender: "Prof. Daniel Lee",
    subject: "Academic writing workshop",
    date: "Oct 19, 2026",
    body: "The workshop preview is scheduled for October 15. You can find the sample event in your academic calendar.",
  },
];

const demoNotifications = [
  {
    id: "assignment-reminder",
    title: "Dataset reflection is coming up",
    detail: "Introduction to Data Science · Due Oct 24, 2026",
  },
  {
    id: "material-added",
    title: "New study guide available",
    detail: "Academic Writing · Essay planning checklist",
  },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const sectionLabels: { id: Section; label: string; icon: typeof BookOpen }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "materials", label: "Study Notes", icon: NotebookPen },
  { id: "assignments", label: "Assignments", icon: CheckCircle2 },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "help", label: "Help", icon: CircleHelp },
];

export function DemoStudentWorkspace({
  fullName,
  institution,
}: {
  fullName: string;
  institution: string;
}) {
  const [section, setSection] = useState<Section>("overview");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [submittedAssignments, setSubmittedAssignments] = useState<string[]>([]);
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [readMessageIds, setReadMessageIds] = useState<string[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 9, 22));
  const demoDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const monthLabel = `${monthNames[demoDate.getMonth()]} ${demoDate.getFullYear()}`;
  const calendarCells = getCalendarCells(demoDate);
  const calendarEvents = [
    {
      id: "studio-check-in",
      date: new Date(2026, 9, 8),
      title: "Design studio check-in",
      category: "discussion" as const,
      detail: "Design Thinking Studio · 10:00 AM",
    },
    {
      id: "writing-workshop",
      date: new Date(2026, 9, 15),
      title: "Academic writing workshop",
      category: "discussion" as const,
      detail: "Academic Writing · 1:30 PM",
    },
    {
      id: "prototype-notes-opens",
      date: new Date(2026, 9, 20),
      title: "Prototype test notes opens",
      category: "assignment_opens" as const,
      detail: "Design Thinking Studio",
    },
    ...assignments.map((assignment) => ({
      id: assignment.id,
      date: assignment.dueDate,
      title: assignment.title,
      category: assignment.category,
      detail: `${assignment.course} · Due`,
    })),
  ];
  const selectedDayEvents = calendarEvents.filter((event) =>
    isSameCalendarDay(event.date, selectedDate)
  );
  const monthEventCount = calendarEvents.filter((event) =>
    isSameCalendarMonth(event.date, demoDate)
  ).length;
  const selectedCourse = courses.find((course) => course.id === selectedCourseId);
  const selectedMaterial = materials.find((material) => material.id === selectedMaterialId);
  const selectedMessage = demoMessages.find((message) => message.id === selectedMessageId);
  const unreadNotificationCount = demoNotifications.filter(
    (notification) => !readNotificationIds.includes(notification.id)
  ).length;
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function navigate(nextSection: Section) {
    setSection(nextSection);
    setSelectedCourseId(null);
    setSelectedMaterialId(null);
    setSelectedMessageId(null);
  }

  function toggleSubmitted(id: string) {
    setSubmittedAssignments((current) =>
      current.includes(id)
        ? current.filter((assignmentId) => assignmentId !== id)
        : [...current, id]
    );
  }

  function moveSelectedMonth(months: number) {
    setSelectedDate((current) => {
      const targetMonth = new Date(
        current.getFullYear(),
        current.getMonth() + months,
        1
      );
      const lastDay = new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth() + 1,
        0
      ).getDate();
      return new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth(),
        Math.min(current.getDate(), lastDay)
      );
    });
  }

  function moveSelectedYear(years: number) {
    setSelectedDate((current) => {
      const targetYear = current.getFullYear() + years;
      const lastDay = new Date(
        targetYear,
        current.getMonth() + 1,
        0
      ).getDate();
      return new Date(targetYear, current.getMonth(), Math.min(current.getDate(), lastDay));
    });
  }

  function openMessage(id: string) {
    setSelectedMessageId(id);
    setReadMessageIds((current) => current.includes(id) ? current : [...current, id]);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 md:flex-row">
      <aside className={`border-b border-border bg-surface md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:self-start md:border-b-0 md:border-r ${collapsedSidebar ? "md:w-[4.5rem]" : "md:w-60"} md:shrink-0`}>
        <nav aria-label="Student workspace" className="flex gap-1 overflow-x-auto py-3 md:h-full md:flex-col md:overflow-visible md:px-3">
          {sectionLabels.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-current={section === id ? "page" : undefined}
              aria-label={collapsedSidebar ? label : undefined}
              title={collapsedSidebar ? label : undefined}
              onClick={() => navigate(id)}
              className={`relative inline-flex min-h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm transition-colors md:w-full md:justify-start ${section === id ? "bg-elevated font-medium text-foreground" : "text-muted hover:bg-elevated hover:text-foreground"} ${collapsedSidebar ? "md:justify-center md:px-2" : ""}`}
            >
              <Icon className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              <span className={collapsedSidebar ? "md:hidden" : ""}>{label}</span>
              {id === "notifications" && unreadNotificationCount > 0 && (
                <span className={`inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white ${collapsedSidebar ? "md:absolute md:-right-1 md:-top-1" : "ml-auto"}`}>
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          ))}
          <div className="hidden flex-1 md:block" />
          <div className={`hidden border-t border-border pt-3 md:block ${collapsedSidebar ? "px-0" : ""}`}>
            <div className={`flex items-center gap-3 rounded-md px-2 py-2 ${collapsedSidebar ? "justify-center" : ""}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange/10 text-xs font-semibold text-orange">
                {initials}
              </span>
              <span className={`min-w-0 ${collapsedSidebar ? "md:hidden" : ""}`}>
                <span className="block truncate text-sm font-medium">{fullName}</span>
                <span className="block text-xs text-muted">Student</span>
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`mt-1 w-full text-muted ${collapsedSidebar ? "md:px-0" : "justify-start"}`}
              aria-label={collapsedSidebar ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsedSidebar ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsedSidebar((collapsed) => !collapsed)}
            >
              {collapsedSidebar ? <PanelLeftOpen className="h-4 w-4" aria-hidden="true" /> : <PanelLeftClose className="h-4 w-4" aria-hidden="true" />}
              <span className={collapsedSidebar ? "md:hidden" : ""}>{collapsedSidebar ? "Expand" : "Collapse sidebar"}</span>
            </Button>
          </div>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 py-8 md:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm text-muted">{institution} · Canvas workspace</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome, {fullName.split(" ")[0]}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Explore a working student dashboard using sample demo content.
            </p>
          </div>
          <Badge variant="orange">Student demo</Badge>
        </div>

        <section className="mt-6" aria-live="polite">
        {section === "overview" && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Enrolled courses" value={`${courses.length}`} detail="Sample courses" />
              <SummaryCard label="To do" value={`${assignments.filter((item) => !submittedAssignments.includes(item.id)).length}`} detail="Demo assignments" />
              <SummaryCard label="Study materials" value={`${materials.length}`} detail="Ready to explore" />
            </div>
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Your courses</h2>
                  <p className="mt-1 text-sm text-muted">Pick up where you left off.</p>
                </div>
                <Button type="button" variant="outline" onClick={() => navigate("courses")}>
                  Browse courses
                </Button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} onOpen={() => {
                    setSelectedCourseId(course.id);
                    setSection("courses");
                  }} />
                ))}
              </div>
            </section>
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Upcoming work</h2>
                  <p className="mt-1 text-sm text-muted">Demo tasks with sample due dates.</p>
                </div>
                <Button type="button" variant="outline" onClick={() => navigate("assignments")}>
                  View assignments
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {assignments.slice(0, 2).map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    submitted={submittedAssignments.includes(assignment.id)}
                    onToggle={() => toggleSubmitted(assignment.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {section === "courses" && (
          selectedCourse ? (
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <Button type="button" variant="ghost" onClick={() => setSelectedCourseId(null)}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to courses
              </Button>
              <p className="mt-5 text-sm font-medium text-orange">{selectedCourse.code}</p>
              <h2 className="mt-1 text-2xl font-bold">{selectedCourse.title}</h2>
              <p className="mt-2 text-sm text-muted">{selectedCourse.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoTile label="Instructor" value={selectedCourse.instructor} />
                <InfoTile label="Next lesson" value={selectedCourse.next} />
              </div>
              <h3 className="mt-6 font-semibold">Course materials</h3>
              <div className="mt-3 space-y-2">
                {materials.filter((material) => material.course === selectedCourse.title).map((material) => (
                  <div key={material.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3">
                    <div><p className="text-sm font-medium">{material.title}</p><p className="mt-1 text-xs text-muted">{material.kind}</p></div>
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      setSelectedMaterialId(material.id);
                      setSection("materials");
                    }}>Open material</Button>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} onOpen={() => setSelectedCourseId(course.id)} />
              ))}
            </div>
          )
        )}

        {section === "assignments" && (
          <div className="space-y-3">
            <SectionHeading title="Assignments" description="Open a task or toggle its demo submission status." />
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                submitted={submittedAssignments.includes(assignment.id)}
                onToggle={() => toggleSubmitted(assignment.id)}
                detailed
              />
            ))}
          </div>
        )}

        {section === "materials" && (
          selectedMaterial ? (
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <Button type="button" variant="ghost" onClick={() => setSelectedMaterialId(null)}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to materials
              </Button>
              <p className="mt-5 text-sm text-muted">{selectedMaterial.course} · {selectedMaterial.kind}</p>
              <h2 className="mt-1 text-2xl font-bold">{selectedMaterial.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{selectedMaterial.description}</p>
              <div className="mt-5 rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm">
                This is a sample lesson preview. Real course files are not connected to this demo.
              </div>
              <Button type="button" className="mt-5" variant="outline" onClick={() => setSelectedMaterialId(null)}>
                Close material
              </Button>
            </section>
          ) : (
            <div className="space-y-3">
              <SectionHeading title="Study materials" description="Open a sample reading or lesson preview." />
              {materials.map((material) => (
                <article key={material.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start gap-3">
                    <span className="rounded-lg bg-orange/10 p-2 text-orange"><FileText className="h-5 w-5" aria-hidden="true" /></span>
                    <div><h3 className="font-medium">{material.title}</h3><p className="mt-1 text-sm text-muted">{material.course} · {material.kind}</p></div>
                  </div>
                  <Button type="button" variant="outline" onClick={() => setSelectedMaterialId(material.id)}>
                    {material.id === "prototype-video" ? <PlayCircle className="h-4 w-4" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                    Open preview
                  </Button>
                </article>
              ))}
            </div>
          )
        )}

        {section === "calendar" && (
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Calendar</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">{monthLabel}</h2>
                <p className="mt-1 text-xs text-muted">
                  {monthEventCount} {monthEventCount === 1 ? "event" : "events"} this month · sample course schedule.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="icon" aria-label="Previous year" title="Previous year" onClick={() => moveSelectedYear(-1)}><ChevronsLeft className="h-4 w-4" aria-hidden="true" /></Button>
                <Button type="button" variant="outline" size="icon" aria-label="Previous month" title="Previous month" onClick={() => moveSelectedMonth(-1)}><ChevronLeft className="h-4 w-4" aria-hidden="true" /></Button>
                <Button type="button" variant="outline" size="sm" aria-label="Today" onClick={() => setSelectedDate(new Date())}>Today</Button>
                <Button type="button" variant="outline" size="icon" aria-label="Next month" title="Next month" onClick={() => moveSelectedMonth(1)}><ChevronRight className="h-4 w-4" aria-hidden="true" /></Button>
                <Button type="button" variant="outline" size="icon" aria-label="Next year" title="Next year" onClick={() => moveSelectedYear(1)}><ChevronsRight className="h-4 w-4" aria-hidden="true" /></Button>
              </div>
            </div>

            <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(15rem,0.85fr)]">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="grid grid-cols-7 border-b border-border">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} role="columnheader" className="bg-background px-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-muted sm:px-3 sm:text-xs">
                      <span className="sm:hidden">{day.slice(0, 1)}</span>
                      <span className="hidden sm:inline">{day}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7" role="grid" aria-label={monthLabel}>
                  {calendarCells.map((cell) => {
                    const dayEvents = cell.date
                      ? calendarEvents.filter((event) => isSameCalendarDay(event.date, cell.date!))
                      : [];
                    const isCurrentMonth = cell.date?.getMonth() === demoDate.getMonth();
                    const isSelected = cell.date && isSameCalendarDay(cell.date, selectedDate);
                    const isToday = cell.date && isSameCalendarDay(cell.date, new Date());
                    return (
                      <button
                        key={cell.key}
                        type="button"
                        role="gridcell"
                        disabled={!cell.date}
                        aria-label={cell.date ? `${monthNames[cell.date.getMonth()]} ${cell.date.getDate()}${dayEvents.length ? `, ${dayEvents.length} scheduled items` : ""}` : undefined}
                        aria-selected={Boolean(isSelected)}
                        onClick={() => cell.date && setSelectedDate(cell.date)}
                        className={`min-h-20 border-b border-r border-border p-1.5 text-left transition-colors sm:min-h-28 sm:p-2 ${isCurrentMonth ? "bg-surface" : "bg-background/70"} ${isSelected ? "relative z-10 outline outline-1 -outline-offset-1 outline-orange/70" : "hover:bg-elevated"}`}
                      >
                        {cell.date && (
                          <>
                            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${isToday ? "bg-orange text-black" : isSelected ? "bg-orange/10 text-orange" : isCurrentMonth ? "text-foreground" : "text-muted"}`}>
                              {cell.date.getDate()}
                            </span>
                            <div className="mt-1 space-y-1">
                              {dayEvents.map((event) => (
                                <span
                                  key={event.id}
                                  title={event.title}
                                  className={`block truncate rounded px-1 py-1 text-[9px] leading-tight sm:text-[11px] ${calendarEventColor(event.category)}`}
                                >
                                  <span className="hidden sm:inline">{event.title}</span>
                                  <span className="sm:hidden">{event.category === "assignment_due" ? "Due" : event.category === "assignment_opens" ? "Opens" : "Discussion"}</span>
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className="flex min-h-72 flex-col rounded-2xl border border-border bg-surface p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {new Intl.DateTimeFormat("en", { weekday: "long" }).format(selectedDate)}
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(selectedDate)}
                </h3>
                {selectedDayEvents.length === 0 ? (
                  <div className="mt-4 flex min-h-24 items-center justify-center rounded-xl border border-dashed border-border px-4 text-center text-xs text-muted">
                    Nothing on this day.
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {selectedDayEvents.map((event) => (
                      <div key={event.id} className="rounded-lg border border-border p-3">
                        <span className={`mb-2 inline-block h-2 w-2 rounded-full ${calendarEventDot(event.category)}`} aria-hidden="true" />
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="mt-1 text-xs text-muted">{event.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 space-y-2 border-t border-border pt-3 text-[11px] text-muted">
                  <CalendarLegend category="assignment_due" label="Assignment due" />
                  <CalendarLegend category="assignment_opens" label="Assignment opens" />
                  <CalendarLegend category="discussion" label="Discussion / poll" />
                </div>
              </aside>
            </div>
          </section>
        )}

        {section === "inbox" && (
          selectedMessage ? (
            <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <Button type="button" variant="ghost" onClick={() => setSelectedMessageId(null)}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to inbox
              </Button>
              <p className="mt-5 text-sm text-muted">{selectedMessage.sender} · {selectedMessage.date}</p>
              <h2 className="mt-1 text-xl font-semibold">{selectedMessage.subject}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{selectedMessage.body}</p>
              <p className="mt-5 rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm text-muted">
                Replies are disabled in this public demo.
              </p>
            </section>
          ) : (
            <div className="space-y-3">
              <SectionHeading title="Inbox" description="Sample course and support messages." />
              {demoMessages.map((message) => {
                const isRead = readMessageIds.includes(message.id);
                return (
                  <article key={message.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
                    <button type="button" className="min-w-0 flex-1 text-left" onClick={() => openMessage(message.id)}>
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                        <span className={`truncate text-sm ${isRead ? "font-medium" : "font-semibold"}`}>{message.subject}</span>
                        {!isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-orange" aria-label="Unread" />}
                      </span>
                      <span className="mt-1 block pl-6 text-xs text-muted">{message.sender} · {message.date}</span>
                    </button>
                    <Button type="button" variant="outline" size="sm" onClick={() => openMessage(message.id)}>
                      Read message
                    </Button>
                  </article>
                );
              })}
            </div>
          )
        )}

        {section === "notifications" && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5">
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="mt-1 text-sm text-muted">Sample course reminders and updates.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={unreadNotificationCount === 0}
                onClick={() => setReadNotificationIds(demoNotifications.map((notification) => notification.id))}
              >
                Mark all as read
              </Button>
            </div>
            {demoNotifications.map((notification) => {
              const isRead = readNotificationIds.includes(notification.id);
              return (
                <article key={notification.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start gap-3">
                    {isRead ? <MailOpen className="mt-0.5 h-4 w-4 text-muted" aria-hidden="true" /> : <Bell className="mt-0.5 h-4 w-4 text-orange" aria-hidden="true" />}
                    <div>
                      <p className={`text-sm ${isRead ? "font-medium" : "font-semibold"}`}>{notification.title}</p>
                      <p className="mt-1 text-xs text-muted">{notification.detail}</p>
                    </div>
                  </div>
                  {!isRead && (
                    <Button type="button" variant="outline" size="sm" onClick={() => setReadNotificationIds((current) => [...current, notification.id])}>
                      Mark as read
                    </Button>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {section === "help" && (
          <div className="space-y-4">
            <SectionHeading title="Help and support" description="Quick guidance for using this student demo." />
            <article className="rounded-xl border border-border bg-surface p-5">
              <h3 className="flex items-center gap-2 font-semibold"><CircleHelp className="h-4 w-4 text-orange" aria-hidden="true" />About this demo</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Use the sidebar to explore sample courses, assignments, study notes, calendar events, messages, and notifications. Demo changes are temporary and are not saved.
              </p>
            </article>
            <article className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-semibold">Need more help?</h3>
              <p className="mt-2 text-sm text-muted">Visit the public FAQ or contact the Arrise Canvas team.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/faq" className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-elevated">Open FAQ</Link>
                <Link href="/contact" className="inline-flex h-10 items-center rounded-md bg-orange px-4 text-sm font-medium text-black transition-colors hover:bg-orange-hover">Contact support</Link>
              </div>
            </article>
          </div>
        )}
      </section>

      <div className="mt-6 rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm text-muted">
        Demo only: courses, dates, materials, and assignment status are sample content. Submission toggles are temporary and are not saved to an account or institution.
      </div>
      </main>
    </div>
  );
}

function getCalendarCells(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const totalCells = 42;

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstWeekday + 1;
    if (day < 1) {
      const date = new Date(year, monthIndex, day);
      return { key: `previous-${date.toISOString()}`, date };
    }
    if (day > daysInMonth) {
      const date = new Date(year, monthIndex, day);
      return { key: `next-${date.toISOString()}`, date };
    }
    return {
      key: `${year}-${monthIndex + 1}-${day}`,
      date: new Date(year, monthIndex, day),
    };
  });
}

function isSameCalendarDay(first: Date, second: Date) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

function isSameCalendarMonth(first: Date, second: Date) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth();
}

function calendarEventColor(category: CalendarEventCategory) {
  if (category === "assignment_due") return "bg-orange/15 font-medium text-orange";
  if (category === "assignment_opens") return "bg-emerald-500/15 font-medium text-emerald-700";
  return "bg-blue-500/15 font-medium text-blue-700";
}

function calendarEventDot(category: CalendarEventCategory) {
  if (category === "assignment_due") return "bg-orange";
  if (category === "assignment_opens") return "bg-emerald-500";
  return "bg-blue-500";
}

function CalendarLegend({
  category,
  label,
}: {
  category: CalendarEventCategory;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${calendarEventDot(category)}`} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="rounded-xl border border-border bg-surface p-4"><p className="text-sm text-muted">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-muted">{detail}</p></div>;
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return <div className="rounded-xl border border-border bg-surface p-5"><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-sm text-muted">{description}</p></div>;
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-border bg-background p-4"><p className="text-xs text-muted">{label}</p><p className="mt-1 text-sm font-medium">{value}</p></div>;
}

function CourseCard({ course, onOpen }: { course: (typeof courses)[number]; onOpen: () => void }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-medium text-orange">{course.code}</p>
      <h3 className="mt-2 font-semibold">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{course.description}</p>
      <p className="mt-3 text-xs text-muted">Instructor: {course.instructor}</p>
      <Button type="button" variant="outline" className="mt-4 w-full" onClick={onOpen}>
        View course
      </Button>
    </article>
  );
}

function AssignmentCard({
  assignment,
  submitted,
  onToggle,
  detailed = false,
}: {
  assignment: (typeof assignments)[number];
  submitted: boolean;
  onToggle: () => void;
  detailed?: boolean;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-orange">{assignment.course}</p>
          <h3 className="mt-1 font-semibold">{assignment.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted"><Clock3 className="h-3 w-3" aria-hidden="true" />Due {assignment.due}</p>
        </div>
        <Badge variant={submitted ? "orange" : "muted"}>{submitted ? "Submitted (demo)" : "To do"}</Badge>
      </div>
      {detailed && <p className="mt-3 text-sm text-muted">{assignment.description}</p>}
      <Button type="button" variant={submitted ? "secondary" : "outline"} size="sm" className="mt-4" onClick={onToggle}>
        {submitted ? "Undo demo submission" : "Mark submitted (demo)"}
      </Button>
    </article>
  );
}
