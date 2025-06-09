"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/lib/errors";

export const getStudentByClass = async (serie: string) => {
  try {
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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientRustPanicError
    ) {
      throw new Error(DATABASE_ERROR_MESSAGE);
    }
    throw error;
  }
};
