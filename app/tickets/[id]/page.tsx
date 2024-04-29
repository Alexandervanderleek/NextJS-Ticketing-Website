import React from 'react'
import prisma from '@/prisma/db'
import TicketDetail from './TicketDetail'

interface Props {
    params: {id: string}
}

const ViewTicket = async ({params}:Props) => {
  
  
    const foundTicket = await prisma.ticket.findUnique({where: {id: parseInt(params.id)},})
  
    const users = await prisma.user.findMany();

    if(!foundTicket){
        return <p className='text-destructive'>Ticket not Found!</p>
    }

    return (
        <TicketDetail ticket={foundTicket} users={users}></TicketDetail>
  )
}

export default ViewTicket