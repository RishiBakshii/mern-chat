import { useEffect, useState } from "react"
import { IChatWithUnreadMessages } from "../../interfaces/chat"
import { SearchInput } from "../ui/SearchInput"
import { ChatList } from "./ChatList"

type PropTypes = {
    chats:Array<IChatWithUnreadMessages>
    loggedInUserId:string
    selectedChatId:string | undefined
    updateSelectedChatId:(chatId: string) => void
    toggleChatBar:()=>void
    getChatName: (selectedChatDetails: IChatWithUnreadMessages | null, loggedInUserId: string | null | undefined) => string | undefined
    getChatAvatar: (selectedChatDetails: IChatWithUnreadMessages | null, loggedInUserId: string | null | undefined) => string | undefined
    clearExtraPreviousMessages: (chatId: string) => void
}

export const ChatListWithSearch = ({chats,loggedInUserId,selectedChatId,clearExtraPreviousMessages,getChatAvatar,getChatName,updateSelectedChatId,toggleChatBar}:PropTypes) => {


    const [searchVal,setSearchVal] = useState<string>("")
    const [filteredChats,setFilteredChats] = useState<Array<IChatWithUnreadMessages>>(chats)

    useEffect(()=>{

        if(!searchVal.trim().length){
            setFilteredChats(chats)
        }
        else{
            setFilteredChats(
                filteredChats.filter(chat=>getChatName(chat,loggedInUserId)?.toLowerCase()?.includes(searchVal.toLowerCase()))
            )
        }
    },[searchVal,chats])

  return (
    <div className="flex flex-col gap-y-5">

        <SearchInput
            setValue={setSearchVal}
            value={searchVal}
        />

        <ChatList
            clearExtraPreviousMessages={clearExtraPreviousMessages}
            selectedChatId={selectedChatId}
            chats={filteredChats} 
            updateSelectedChatId={updateSelectedChatId}
            toggleChatBar={toggleChatBar}
            loggedInUserId={loggedInUserId}
            getChatName={getChatName}
            getChatAvatar={getChatAvatar}
        />

    </div>
  )
}
