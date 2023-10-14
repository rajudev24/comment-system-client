import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://comment-system-backend.vercel.app/api/v1/auth' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: "POST",
                body: data
            })
        }),


    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;