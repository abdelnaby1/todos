"use client";

import { deleteTodoAction } from "@/actions/todo.actions";
import { Pen, Plus, Trash } from "lucide-react";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import TodoForm from "./TodoForm";
import TodoDialog from "./TodoDialog";
import { ITodo } from "@/interfaces";
import { title } from "process";
import { TodoFormValues } from "@/validation";

interface IActionsProps {
  todo: ITodo;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onEditClick: Dispatch<SetStateAction<TodoFormValues>>;
}
const TodosTableActions = ({
  todo,
  isOpen,
  setIsOpen,
  onEditClick,
}: IActionsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onTodoDelete = async (id: string) => {
    setIsLoading(true);
    await deleteTodoAction(id);
    setIsLoading(false);
    toast({
      variant: "default",
      //   style: { background: "#9AE6B4" },
      title: "Todo Deleted Successfully",
    });
  };
  const onTodoEditClicked = (todo: ITodo) => {
    const todoData: TodoFormValues = {
      id: todo.id,
      title: todo.title,
      body: todo.body!,
      completed: todo.completed,
    };
    onEditClick(todoData);
    setIsOpen(true);
  };

  return (
    <>
      <Button size={"icon"} onClick={() => onTodoEditClicked(todo)}>
        <Pen size={16} />
      </Button>

      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={() => onTodoDelete(todo.id)}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};
export default TodosTableActions;
