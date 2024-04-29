import { Prisma, Ticket } from '@prisma/client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import TicketStatusBadge from './TicketStatusBadge'
import Link from 'next/link'
import TicketPriority from './TicketPriority'


type TicketWithUser = Prisma.TicketGetPayload<{
    include: {assignedToUser: true}
}>

interface Props {
    tickets: TicketWithUser[]
}

const DashRecent = ({tickets}:Props) => {
  return (<Card className='col-span-3'>
    <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
    </CardHeader>
    <CardContent>
        <div className='space-y-8'>
            {tickets? tickets.map((ticket) => (
                <div className='flex items-center' key={ticket.id}>
                        <TicketStatusBadge status={ticket.status}></TicketStatusBadge>
                        <div className='ml-4 space-y-1'>
                        <Link href={`tickets/${ticket.id}`}>
                            <p>{"Issue: " +ticket.title}</p>
                            <p>{"Assigned: " +ticket.assignedToUser?.name || "nobody"}</p>
                        </Link>
                        </div>
                        <div className='ml-auto font-medium'>
                            <TicketPriority priority={ticket.priority}></TicketPriority>
                        </div>
                    </div>
            )) : null}
        </div>
    </CardContent>
  </Card>)
}

export default DashRecent