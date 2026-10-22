export const SUBJECTS = [
  {
    id: "s1",
    name: "Data Structures and Algorithms",
    code: "CS301",
    term: "Fall 2026",
    instructor: "Dr. Rajesh Kumar",
    overview: "Study of fundamental data structures including arrays, linked lists, trees, graphs, and algorithms for searching, sorting, and optimization.",
    units: [
      {
        id: "u1",
        name: "Arrays and Linked Lists",
        order: 1,
        topics: [
          {
            id: "t1",
            name: "Array Operations",
            order: 1,
            materials: [
              {
                id: "m1",
                title: "Introduction to Arrays",
                description: "Basic concepts, operations and complexity analysis",
                type: "pdf",
                subjectId: "s1",
                unitId: "u1",
                topicId: "t1",
                fileName: "arrays-intro.pdf",
                fileSize: 2450000,
                uploadedBy: "Dr. Rajesh Kumar",
                uploadedAt: "2026-09-15T10:30:00Z",
                published: true,
                downloads: 124,
                completed: false,
              },
            ],
          },
        ],
      },
    ],
    materialsCount: 12,
    assignmentsCount: 4,
    quizzesCount: 3,
    announcements: [
      {
        id: "a1",
        title: "Welcome to CS301",
        body: "Welcome to Data Structures and Algorithms. Please check the syllabus.",
        subjectId: "s1",
        author: "Dr. Rajesh Kumar",
        authorRole: "faculty",
        createdAt: "2026-09-01T09:00:00Z",
        pinned: true,
      },
    ],
  },
];
export default SUBJECTS;