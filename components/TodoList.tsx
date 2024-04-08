"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Plus, Trash } from "lucide-react";
import TodoDialog from "./TodoDialog";
import { Button } from "./ui/button";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodosTableActions from "./TodosTableActions";
import { useState } from "react";
import { TodoFormValues } from "@/validation";
import { todo } from "node:test";
import TodoForm from "./TodoForm";

interface IProps {
  todos: ITodo[];
  user_id: string | null;
}
export function TodoList({ user_id, todos }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [todoData, setTodoData] = useState<TodoFormValues>({
    title: "",
    body: "",
    completed: false,
  });
  const onAddTodoClick = () => {
    setTodoData({
      title: "",
      body: "",
      completed: false,
    });
    setIsOpen(true);
  };
  return (
    <>
      <div className="flex justify-end ">
        <Button onClick={onAddTodoClick}>
          <Plus size={16} className="mr-1" />
          New Todo
        </Button>
      </div>
      {/* Add Todo */}
      <TodoDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <TodoForm
          user_id={user_id}
          defaultTodo={todoData}
          setIsOpen={setIsOpen}
        />
      </TodoDialog>
      {/* Edit Todo */}
      <TodoDialog
        title="Edit Todo"
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      >
        <TodoForm
          user_id={user_id}
          mode="edit"
          defaultTodo={todoData}
          setIsOpen={setIsEditDialogOpen}
        />
      </TodoDialog>
      <Table>
        <TableCaption>A list of your recent todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Titile</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.id}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                <Badge variant={todo.completed ? "default" : "secondary"}>
                  {todo.completed ? "Completed" : "Uncompleted"}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-end space-x-2">
                <TodosTableActions
                  isOpen={isEditDialogOpen}
                  setIsOpen={setIsEditDialogOpen}
                  onEditClick={setTodoData}
                  todo={todo}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{todos.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
