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
            query: ({ commentId, ...data }) => ({
                url: `/like/${commentId}`,
                method: "POST",
                body: data
            })
        }),
        dislikeComment: builder.mutation({
            query: ({ commentId, ...data }) => ({
                url: `/dislike/${commentId}`,
                method: "POST",
                body: data
            })
        }),
        updateComment: builder.mutation({
            query: ({ commentId, ...data }) => ({
                url: `/update-comment/${commentId}`,
                method: "PATCH",
                body: data
            })
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/delete-comment/${id}`,
                method: "DELETE",
            })
        }),

    })
})

export const { useCommentAddMutation, useLikeCommentMutation, useDislikeCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = commentApi;