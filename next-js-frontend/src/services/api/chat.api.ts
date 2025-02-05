import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ChatWithUnreadMessages } from "../../interfaces/chat.interface";
import { fetchUserChatsResponse } from "@/lib/server/services/userService";

export const chatApi = createApi({
    reducerPath:"chatApi",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_BASE_URL,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        getChats:builder.query<fetchUserChatsResponse[],void>({
            query:()=>"/chat"
        }),
        createChat:builder.mutation<void,Required<Pick<ChatWithUnreadMessages,'name'> & {members:string[],isGroupChat:string}> & {avatar?:Blob}>({
            query:({name,members,isGroupChat,avatar})=>{
                const formData = new FormData()
                formData.append("name", name);
                for (const member of members) formData.append("members[]", member);
                formData.append("isGroupChat", isGroupChat); 
                if(avatar) formData.append("avatar",avatar)
                return {
                    url: "/chat",
                    method: "POST",
                    body: formData,
                  };
            },
        }),
        updateChat:builder.mutation<void,{chatId:string,avatar?:Blob,name?:string}>({
            query:({avatar,name,chatId})=>{
                const formData = new FormData()
                if(avatar) formData.append('avatar',avatar)
                if(name) formData.append("name",name)
                return {
                    url: `/chat/${chatId}`,
                    method: "PATCH",
                    body: formData,
                };
            }
        }),
        addMember:builder.mutation<void,{members:string[],_id:string}>({
            query:({_id,members})=>({
                url:`/chat/${_id}/members`,
                method:"PATCH",
                body:{members}
            })
        }),
        removeMember:builder.mutation<void,{chatId:string,memberIds:string[]}>({
            query:({chatId,memberIds})=>({
                url:`/chat/${chatId}/members`,
                method:"DELETE",
                body:{members:memberIds}
            })
        })
    })
})

export const {
    useLazyGetChatsQuery,
    useGetChatsQuery,
    useCreateChatMutation,
    useAddMemberMutation,
    useRemoveMemberMutation,
    useUpdateChatMutation,
} = chatApi