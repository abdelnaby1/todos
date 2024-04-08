"use server";
import { TodoFormValues } from "@/validation";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { title } from "process";
const prisma = new PrismaClient();

export const getTodoListAction = async (user_id: string | null) => {
  return await prisma.todo.findMany({
    where: {
      user_id: user_id as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const createTodoAction = async ({
  title,
  body,
  completed,
  user_id,
}: {
  title: string;
  completed: boolean;
  user_id: string | null;
  body?: string | undefined;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      user_id: user_id!,
    },
  });
  revalidatePath("/");
};
export const updateTodoAction = async ({
  id,
  title,
  body,
  completed,
}: TodoFormValues) => {
  await prisma.todo.update({
    where: { id },
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};
export const deleteTodoAction = async (id: string) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};
