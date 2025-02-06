import { Event } from "@/interfaces/events.interface";
import { NewReactionEventReceiveData } from "@/interfaces/message.interface";
import { messageApi } from "@/lib/client/rtk-query/message.api";
import { useAppDispatch } from "@/lib/client/store/hooks";
import { useSocketEvent } from "../useSocket/useSocketEvent";

export const useNewReactionListener = () => {
  const dispatch = useAppDispatch();

  useSocketEvent(
    Event.NEW_REACTION,
    ({ user, emoji, chatId, messageId }: NewReactionEventReceiveData) => {
      dispatch(
        messageApi.util.updateQueryData(
          "getMessagesByChatId",
          { chatId, page: 1 },
          (draft) => {
            const message = draft.messages.find(
              (draft) => draft._id === messageId
            );
            if (message) {
              message.reactions.push({ user, emoji });
            }
          }
        )
      );
    }
  );
};
