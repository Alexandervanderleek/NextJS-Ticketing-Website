"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  id: number;
}

const DeleteButton = ({ id }: Props) => {
  const router = useRouter();
  const [error, SetError] = useState("");
  const [isDeleting, SetIsDeleting] = useState(false);

  const deleteTicket = async () => {
    try {
      SetIsDeleting(true);
      await axios.delete("/api/tickets/" + id);

      SetIsDeleting(false);

      router.push("/tickets");
      router.refresh();
    } catch (error) {
      SetIsDeleting(false);
      SetError("Unknown Error Occured");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({
            variant: "destructive",
          })}
          disabled={isDeleting}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({
                variant: "destructive",
              })}
              disabled={isDeleting}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
};

export default DeleteButton;
