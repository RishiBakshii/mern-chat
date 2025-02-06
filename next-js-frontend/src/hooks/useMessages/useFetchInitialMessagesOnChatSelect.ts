import { selectSelectedChatDetails } from "@/lib/client/slices/chatSlice";
import { useAppSelector } from "@/lib/client/store/hooks";
import { useEffect } from "react";
import { useGetMessages } from "./useGetMessages";

export const useFetchInitialMessagesOnChatSelect = () => {
  const { getMessages, currentData, isFetching, isLoading, data } =
    useGetMessages();
  const selectedChatId = useAppSelector(selectSelectedChatDetails)?._id;

  useEffect(() => {
    if (selectedChatId) {
      getMessages({ chatId: selectedChatId, page: 1 }, true);
    }
  }, [selectedChatId]);

  return { currentData, isFetching, isLoading, data };
};
