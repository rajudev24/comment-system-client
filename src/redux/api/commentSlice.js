import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/comment' }),
    endpoints: (builder) => ({
        commentAdd: builder.mutation({
            query: (data) => ({
                url: '/add-comment',
                method: "POST",
                body: data
            })
        }),
        likeComment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/like/${id}`,
                method: "POST",
                body: data
            })
        }),
        dislikeComment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/dislike/${id}`,
                method: "POST",
                body: data
            })
        })

    })
})