"use client";

import { deleteTodoAction } from "@/actions/todo.actions";
import { Pen, Plus, Trash } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import TodoForm from "./TodoForm";

interface IActionsProps {
  id: string;
}
const TodosTableActions = ({ id }: IActionsProps) => {
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
  // if (true) {
  //   <TodoForm>
  //     <div className="flex justify-end ">
  //       <Button>
  //         <Plus size={16} className="mr-1" />
  //         updte Todo
  //       </Button>
  //     </div>
  //   </TodoForm>;
  // }
  return (
    <>
      <Button size={"icon"}>
        <Pen size={16} />
      </Button>
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={() => onTodoDelete(id)}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};
export default TodosTableActions;
