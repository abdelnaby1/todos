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
import TodoForm from "./TodoForm";
import { Button } from "./ui/button";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodosTableActions from "./TodosTableActions";

interface IProps {
  todos: ITodo[];
}
export function TodoList({ todos }: IProps) {
  return (
    <>
      <TodoForm>
        <div className="flex justify-end ">
          <Button>
            <Plus size={16} className="mr-1" />
            New Todo
          </Button>
        </div>
      </TodoForm>
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
                <TodosTableActions id={todo.id} />
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
