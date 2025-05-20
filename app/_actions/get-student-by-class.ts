"use server";

import { db } from "@/lib/prisma";

export const getStudentByClass = async (serie: string) => {
  const students = await db.student.findMany({
    where: {
      serie: {
        name: serie,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return students.map((student) => ({
    id: student.id.toString(), // garante que seja string
    student: student.name, // renomeia para "student"
  }));
};
