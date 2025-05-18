"use server";

import { db } from "@/lib/prisma";

export const getStudentByClass = async (serie: string) => {
  const students = await db.student.findMany({
    where: { serie },
  });

  return students;
};
