import { Ticket, User } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/ticketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkDown from  'react-markdown';
import DeleteButton from "./DeleteButton";
import AssignTicket from "@/components/AssignTicket";

interface Props {
  ticket: Ticket;
  users: User[]
}

const TicketDetail = ({ ticket,users }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status}></TicketStatusBadge>
            <TicketPriority priority={ticket.priority}></TicketPriority>
          </div>

          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created: {ticket.createdAt.toLocaleDateString()}
          </CardDescription>
        </CardHeader>

        <CardContent className="prose dark:prose-invert"><ReactMarkDown>{ticket.description}</ReactMarkDown></CardContent>
        <CardFooter>
          Updated: {ticket.updatedAt.toLocaleDateString()}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <AssignTicket ticket={ticket} users={users}></AssignTicket>
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: "default" })}`}
        >
          Edit Ticket
        </Link>
       <DeleteButton id={ticket.id}></DeleteButton>
      </div>
    </div>
  );
};

export default TicketDetail;
