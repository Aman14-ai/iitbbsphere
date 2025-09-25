import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GraduationCap,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const DashboardView = () => {
  const branches = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 py-6 px-3 sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-4">
            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
            Engineering Branches
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2 sm:mb-4">
            Choose Your Branch
          </h1>
          <p className="text-sm sm:text-md text-muted-foreground max-w-2xl mx-auto">
            Explore study materials, resources, and connect with students from
            your engineering branch
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {branches.map((branch) => (
            <Link key={branch.slug} href={`/dashboard/${branch.slug}`}>
              <Card className="group h-full border border-transparent rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                <CardContent className="p-4 sm:p-6 flex flex-col items-start">
                  {/* Branch Image Container */}
                  <div className="w-full h-30 mb-3 sm:mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="relative rounded-lg w-full h-full flex items-center justify-center">
                      <Image
                        width={400}
                        height={600}
                        className="rounded-lg"
                        src={branch.image}
                        alt={branch.name}
                      />
                    </div>
                  </div>

                  {/* Branch Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-2 line-clamp-1">
                    {branch.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {branch.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground w-full mb-2 sm:mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{branch.studentCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="truncate max-w-[80px]">
                        {branch.courses.split(",")[0]}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="default"
                    className="w-full py-1.5 sm:py-2 text-xs sm:text-sm border-border  hover:border-primary/30 text-white flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Explore Branch</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4 sm:p-8">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                Can&apos;t Find Your Branch?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                Contact us to add your engineering branch to the platform
              </p>
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-primary to-primary/70 text-xs sm:text-sm py-1 sm:py-2">
                  Request New Branch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
