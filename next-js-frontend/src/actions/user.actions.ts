"use server";

import { prisma } from "@/lib/server/prisma";

export async function searchUser(prevState:any,data:{username:string}){
    try {
        const {username} = data

        if(!username?.toString().trim()){
            return {
                errors:{
                    message:"Username cannot be empty"
                },
                data:null,
            }
        }
    
        const searchTerm = username.toString().trim();
    
        const users = await prisma.user.findMany({
            where:{
                username:{
                    contains:searchTerm,
                    mode:"insensitive"
                }
            },
            select:{
                id:true,
                name:true,
                username:true,
                avatar:true
            }
        })
    
        return {
            errors:{
                message:null,
            },
            data:users,
        }

    } catch (error) {
        console.log("error fetching search user result",error);
        return {
            errors:{
                message:"Some error occured"
            },
            data:null,
        }
    }
}