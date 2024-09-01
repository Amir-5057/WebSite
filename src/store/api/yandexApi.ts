import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { YGetAllIds, YGetAllLogins, YGetUserInfo, YGetUserLogins } from "./types";

import { yandexUrl } from "../../utils/baseUrl";

export const yandexApi = createApi({
  reducerPath: "yandexApi",
  baseQuery: fetchBaseQuery({ baseUrl: yandexUrl }),
  endpoints: (builder) => ({
    getAllLogins: builder.query<YGetAllLogins, YGetUserLogins>({
      query: (login) => ({
        url: "/login",
        method: "GET",
        body: login,
      }),
    }),
    getAllIDs: builder.query<YGetAllIds, number>({
        query: (ids) => `/id?ids=${ids}`,
    }), 
    getUserInfo: builder.query<YGetUserInfo, string>({
        query: (userInfo) => ({
          url: "/user",
          method: "GET",
          body: userInfo,
        })
    }),
  }),
});



export const {
  useGetAllLoginsQuery,
  useGetAllIDsQuery,
  useGetUserInfoQuery,
} = yandexApi;