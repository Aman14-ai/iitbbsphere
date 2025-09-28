export const adminEmail = [
  "24ce01005@iitbbs.ac.in",
  "24cs01005@iitbbs.ac.in",
  "24ce01006@iitbbs.ac.in",
  "aman@iitbbs.ac.in"
];

export const AllowedEmail = ['amansachi2005@gmail.com' , 'dhanjidwivedi@gmail.com']

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink?: string;
};

export type FileGroup = {
  notes: DriveFile[];
  tutorials: DriveFile[];
  assignments: DriveFile[];
  pyqs: DriveFile[];
  other: DriveFile[];
};

export const branchCodeMap: Record<
  | "civil"
  | "mechanical"
  | "electrical"
  | "computer-science"
  | "electronics-communication"
  | "metallurgical",
  string
> = {
  civil: "ce",
  mechanical: "me",
  electrical: "ee",
  "computer-science": "cs",
  "electronics-communication": "ec",
  metallurgical: "mm",
};

export const codeBranchMap: Record<"ce" | "me" | "ee" | "cs" | "ec" | "mm", string> = {
  ce: "civil",
  me: "mechanical",
  ee: "electrical",
  cs: "computer-science",
  ec: "electronics-communication",
  mm: "metallurgical",
};

export const branchInfo: { [key: string]: { name: string; description: string; color: string } } = {
  civil: {
    name: "Civil Engineering",
    description: "Structural design, construction management, and infrastructure development",
    color: "from-blue-500 to-blue-600"
  },
  "computer-science": {
    name: "Computer Science",
    description: "Algorithms, software development, AI, and computer systems",
    color: "from-purple-500 to-purple-600"
  },
  "electronics-communication": {
    name: "Electronics and Communication",
    description: "Electronics, communication systems, and signal processing",
    color: "from-green-500 to-green-600"
  },
  electrical: {
    name: "Electrical Engineering",
    description: "Power systems, electrical machines, and control systems",
    color: "from-yellow-500 to-yellow-600"
  },
  mechanical: {
    name: "Mechanical Engineering",
    description: "Thermodynamics, manufacturing, and mechanical design",
    color: "from-red-500 to-red-600"
  },
  metallurgical: {
    name: "Metallurgical Engineering",
    description: "Materials science, metallurgy, and material processing",
    color: "from-indigo-500 to-indigo-600"
  }
};

export const branches = [
    {
      name: "Civil Engineering",
      slug: "civil",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OJ4tw8qvwVGug1RMsJ72o3Itz1qLz4tujw&s",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      studentCount: "450+",
      courses: "Structural Analysis, Geotechnical Engineering",
      description:
        "Structural design, construction management, and infrastructure development",
    },
    {
      name: "Computer Science",
      slug: "computer-science",
      image:
        "https://www.durham.ac.uk/media/durham-university/departments-/computer-science/84043.jpg",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      studentCount: "680+",
      courses: "Data Structures, Machine Learning, OS",
      description: "Algorithms, software development, AI, and computer systems",
    },
    {
      name: "Electronics and Communication",
      slug: "electronics-communication",
      image:
        "https://media.licdn.com/dms/image/v2/D5612AQHmh4gg06tyTw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1661693902597?e=2147483647&v=beta&t=e7sV7qph9jy-OOTmTuc1vka1j6H3O1J4Jd-og6IC-Rs",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      studentCount: "320+",
      courses: "Digital Electronics, Communication Systems",
      description: "Electronics, communication systems, and signal processing",
    },
    {
      name: "Electrical Engineering",
      slug: "electrical",
      image:
        "https://www.tridenttechlabs.com/uae/blogs/wp-content/uploads/2025/07/Industrial-Electrical-Network-Engineering-Design-850x567.jpg",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      studentCount: "280+",
      courses: "Power Electronics, Control Systems",
      description: "Power systems, electrical machines, and control systems",
    },
    {
      name: "Mechanical Engineering",
      slug: "mechanical",
      image:
        "https://www.accurate.in/img/college/1658318395-Mechanical-Engineering.jpg",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      studentCount: "520+",
      courses: "Thermodynamics, Machine Design",
      description: "Thermodynamics, manufacturing, and mechanical design",
    },
    {
      name: "Metallurgical Engineering",
      slug: "metallurgical",
      image:
        "https://t4.ftcdn.net/jpg/08/22/82/63/360_F_822826385_p1jmRbJG7iUD5w3asKqXVAoxpz2Qh5QE.jpg",
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
      studentCount: "180+",
      courses: "Material Science, Extractive Metallurgy",
      description: "Materials science, metallurgy, and material processing",
    },
  ];
