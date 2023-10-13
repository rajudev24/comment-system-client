import { useState } from "react";
import ShowComment from "./ShowComment";
import { useCommentAddMutation } from "../redux/api/commentSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { extractUserInfoFromToken } from "../util";

export default function Comment() {
  const [comment, setComment] = useState("");
  const [addComment] = useCommentAddMutation();
  const [isNewComment, setIsNewComment] = useState(false);
  const userId = extractUserInfoFromToken();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const data = {
      text: comment,
      author: userId,
    };
    try {
      const resultAction = await addComment(data);
      if (resultAction.data.statusCode === 200) {
        toast.success(resultAction.data.message);
        setIsNewComment(true);
      }
    } catch (error) {
      console.error("Comment failed:", error);
    }
    setComment("");
  };
  return (
    <div>
      <h1 className="mt-4">Write here</h1>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          name="comment"
          className="w-full border-2 p-1 rounded-md"
          placeholder="write your thought"
          onChange={handleCommentChange}
          value={comment}
        />
        <button
          className="bg-indigo-700 text-white p-1 rounded-md"
          type="submit"
        >
          Add Comment
        </button>
      </form>
      <ShowComment isNewComment={isNewComment} />
      <ToastContainer />
    </div>
  );
}
