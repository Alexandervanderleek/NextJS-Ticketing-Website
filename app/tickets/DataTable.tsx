import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/ticketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams
}

function DataTable({ tickets, searchParams }: Props) {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                
                <Link href={{query:{...searchParams, orderBy: "title"}}}>Title</Link>
                <ArrowDown opacity={"title" === searchParams.orderBy ? 1 : 0} className="inline p-1"/>
                
              </TableHead>
              <TableHead>
                
                  <Link className="align-middle" href={{query:{...searchParams, orderBy: "status"}}}>Status</Link>
                  <ArrowDown opacity={"status" === searchParams.orderBy ? 1 : 0} className="inline p-1"/>
                
              </TableHead>
              <TableHead>
                
                  <Link className="align-middle" href={{query:{...searchParams, orderBy: "priority"}}}>Priority</Link>
                  <ArrowDown opacity={"priority" === searchParams.orderBy ? 1 : 0} className="inline p-1"/>
                
              </TableHead>
              <TableHead>
                  
                  <Link className="align-middle" href={{query:{...searchParams, orderBy: "createdAt"}}}>Created At</Link>
                  <ArrowDown opacity={"createdAt" === searchParams.orderBy ? 1 : 0} className="inline p-1"/>
                  
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            
            {tickets
              ? tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell> <Link href={`/tickets/${ticket.id}`}> {ticket.title} </Link></TableCell>
                    <TableCell>
                      <div className="flex">
                        <TicketStatusBadge
                          status={ticket.status}
                        ></TicketStatusBadge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <TicketPriority
                          priority={ticket.priority}
                        ></TicketPriority>
                      </div>
                    </TableCell>
                    <TableCell>
                      {ticket.createdAt.toLocaleDateString("en-UK", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
