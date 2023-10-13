import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeleteCommentMutation,
  useDislikeCommentMutation,
  useLikeCommentMutation,
  useUpdateCommentMutation,
} from "../redux/api/commentSlice";
import { extractUserInfoFromToken } from "../util";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchComments } from "../redux/features/commentsSlice";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import CommentDetails from "./CommentDetails";
import CommentFilter from "./CommentFIlter";

export default function ShowComment(isNewComment) {
  const [editingComment, setEditingComment] = useState({ id: null, text: "" });
  const [comments, setComments] = useState([]);
  const userId = extractUserInfoFromToken();
  const [likeComment] = useLikeCommentMutation();
  const [dislikeComment] = useDislikeCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const queryParams = {
      page: currentPage,
      limit: 3,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    fetchCommentsData(queryParams);
  }, [currentPage, sortBy, sortOrder, isNewComment]);

  const fetchCommentsData = (queryParams) => {
    dispatch(fetchComments(queryParams)).then((resultAction) => {
      if (fetchComments.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        setComments(data?.data?.data);
      } else {
        const error = resultAction.error;
        console.error(error);
      }
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handleLike = async (commentId) => {
    const data = {
      commentId,
      userId,
    };
    try {
      const resultAction = await likeComment(data);
      if (resultAction.data.statusCode === 200) {
        toast.success(resultAction.data.comment);
        fetchCommentsData({ page: currentPage, limit: 3, sortBy, sortOrder });
      }
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  const handleDislike = async (commentId) => {
    const data = {
      commentId,
      userId,
    };
    try {
      const resultAction = await dislikeComment(data);
      if (resultAction.data.statusCode === 200) {
        toast.success(resultAction.data.comment);
        fetchCommentsData({ page: currentPage, limit: 3, sortBy, sortOrder });
      }
    } catch (error) {
      console.error("Dislike failed:", error);
    }
  };

  const handleReply = (commentId) => {
    console.log(`Replied to comment with ID ${commentId}`);
  };

  const handleEdit = (comment) => {
    setEditingComment({ id: comment.id, text: comment.text });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const data = {
      commentId: editingComment.id,
      text: editingComment.text,
    };
    try {
      const resultAction = await updateComment(data);
      console.log(resultAction.data);
      if (resultAction.data.statusCode === 200) {
        toast.success(resultAction.data.comment);
        fetchCommentsData({ page: currentPage, limit: 3, sortBy, sortOrder });
      }
      setEditingComment({ id: null, text: "" });
    } catch (error) {
      console.error("Dislike failed:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const resultAction = await deleteComment(commentId);
      if (resultAction.data.statusCode === 200) {
        toast.success(resultAction.data.comment);
        fetchCommentsData({ page: currentPage, limit: 3, sortBy, sortOrder });
      }
    } catch (error) {
      console.error("Dislike failed:", error);
    }
  };

  return (
    <div className="border-2 rounded-md mt-2 mb-8 py-2">
      <CommentFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      {comments &&
        comments.map((comment) => (
          <CommentDetails
            key={comment.id}
            comment={comment}
            userId={userId}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleReply={handleReply}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingComment={editingComment}
            setEditingComment={setEditingComment}
            handleSubmitEdit={handleSubmitEdit}
          />
        ))}
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
}
