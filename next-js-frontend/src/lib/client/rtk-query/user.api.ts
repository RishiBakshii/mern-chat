import { FetchUserInfoResponse } from "@/lib/server/services/userService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../../interfaces/auth.interface";
import {
  updateLoggedInUser,
  updateLoggedInUserNotificationStatus,
} from "../slices/authSlice";
import { RootState } from "../store/store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    
    updateProfile: builder.mutation<FetchUserInfoResponse, { avatar: Blob }>({
      query: ({ avatar }) => {
        const formData = new FormData();
        formData.append("avatar", avatar);
        return {
          url: "/",
          method: "PATCH",
          body: formData,
        };
      },
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        const { data: UpdatedUser } = await queryFulfilled;
        dispatch(updateLoggedInUser(UpdatedUser));
      },
    }),

    updateNotifications: builder.mutation<Pick<User, "notificationsEnabled">,{ isEnabled: boolean }>({
      query: ({ isEnabled }) => ({
        method: "PATCH",
        url: "/notifications",
        body: { isEnabled },
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          updateLoggedInUserNotificationStatus(data.notificationsEnabled)
        );
      },
    }),
    
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateNotificationsMutation,
} = userApi;
