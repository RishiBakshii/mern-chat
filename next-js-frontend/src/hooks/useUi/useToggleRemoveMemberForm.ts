import {
  selectRemoveMemberForm,
  setRemoveMemberForm,
} from "../../lib/client/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../../lib/client/store/hooks";

export const useToggleRemoveMemberForm = () => {
  const dispatch = useAppDispatch();
  const removeMemberForm = useAppSelector(selectRemoveMemberForm);

  const toggleRemoveMember = () => {
    dispatch(setRemoveMemberForm(!removeMemberForm));
  };

  return { toggleRemoveMember };
};
