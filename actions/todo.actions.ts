"use server";
import { TodoFormValues } from "@/validation";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { title } from "process";
const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const createTodoAction = async ({
  title,
  body,
  completed,
}: TodoFormValues) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async (id: string) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};
