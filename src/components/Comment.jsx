import { useState } from "react";

export default function Comment() {
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

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
    </div>
  );
}
