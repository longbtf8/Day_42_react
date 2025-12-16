import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery({ baseUrl: "https://api01.f8team.dev/api" }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
    }),
  }),
});
export const { useGetCurrentUserQuery, useRegisterMutation, useLoginMutation } =
  authApi;
