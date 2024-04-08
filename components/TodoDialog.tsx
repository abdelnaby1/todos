import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}
const TodoDialog = ({
  title = "Add Todo",
  children,
  isOpen,
  setIsOpen,
}: IProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
