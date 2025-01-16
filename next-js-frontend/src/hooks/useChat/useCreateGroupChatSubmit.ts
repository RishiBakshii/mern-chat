import { GroupChatSchemaType } from "@/schemas/chat.schema"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { useCreateGroupChat } from "./useCreateGroupChat"

type PropTypes = {
    selectedMembers:string[]
    image:Blob | undefined
}


export const useCreateGroupChatSubmit = ({image,selectedMembers}:PropTypes) => {

    const {createChat,isSuccess} = useCreateGroupChat()

    const createGroupChatSubmitHandler: SubmitHandler<GroupChatSchemaType> = (data) => {
        if(selectedMembers.length<2){
          return toast.error("Atleast 2 members are required")
        }
        else{
          createChat({
            avatar:image?image:undefined,
            name:data.name,
            isGroupChat:"true",
            members:selectedMembers,
          })
        }
    }

    return {createGroupChatSubmitHandler};
}
