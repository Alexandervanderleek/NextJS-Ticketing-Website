import { userSchema } from "@/ValidationSchemas/users";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {id: string}
}

export async function PATCH(request: NextRequest, {params}:Props){

    //console.log("patch");


    const body = await request.json();

    //console.log(body);

    const validation = userSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!user){
        return NextResponse.json({error: "User Not Found"}, {status: 404});
    }


    if(body?.password && body.password != ""){
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword;
    }else{
        delete body.password;
    }


    if(user.username !== body.username){
        const duplicateUserName = await prisma.user.findUnique({
            where: {username: body.username}
        });
        if(duplicateUserName){
            return NextResponse.json({message: "Duplicate Username"}, {status: 409});
        }
    }

    const updateUser = await prisma.user.update({
        where: {id: user.id},
        data: {
            ...body,
        },
    })

    //console.log("sucess");
    //console.log((await updateUser).role);

    return NextResponse.json(updateUser);

}