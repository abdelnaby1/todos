"use server";
import { getTodoListAction } from "@/actions/todo.actions";
import { TodoList } from "@/components/TodoList";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();

  const todos = await getTodoListAction(userId);
  return (
    <main className="container w-3/4">
      <TodoList todos={todos} user_id={userId} />
    </main>
  );
}
