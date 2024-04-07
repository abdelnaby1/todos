import { getTodoListAction } from "@/actions/todo.actions";
import TodoCard from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const todos = await getTodoListAction();
  return (
    <main className="container">
      <TodoList todos={todos} />
    </main>
  );
}
