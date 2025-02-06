"use client";
import { useFetchInitialMessagesOnChatSelect } from "@/hooks/useMessages/useFetchInitialMessagesOnChatSelect";
import { selectSelectedChatDetails } from "@/lib/client/slices/chatSlice";
import { useAppSelector } from "@/lib/client/store/hooks";
import { MessageListSkeleton } from "../ui/skeleton/MessageListSkeleton";
import { MessageList } from "./MessageList";

type PropTypes = {
  loggedInUserId: string;
};

export const MessageListSkeletonWrapper = ({ loggedInUserId }: PropTypes) => {
  const selectedChatDetails = useAppSelector(selectSelectedChatDetails);
  const { currentData, isLoading } = useFetchInitialMessagesOnChatSelect();

  if (isLoading) return <MessageListSkeleton />;
  if (!currentData) return null;
  if (!selectedChatDetails) return null;

  return (
    <MessageList
      messages={currentData.messages}
      selectedChatDetails={selectedChatDetails}
      totalPages={currentData.totalPages}
      loggedInUserId={loggedInUserId}
    />
  );
};
