/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
export default function CommentDetails({
  comment,
  userId,
  handleLike,
  handleDislike,
  handleReply,
  handleEdit,
  handleDelete,
  editingComment,
  setEditingComment,
  handleSubmitEdit,
}) {
  const user = useSelector((state) => state.user);
  const isCommentOwner = comment.author.id === userId;
  return (
    <div key={comment.id} className="bg-gray-300 p-2 m-1 rounded-md">
      <span className="text-lg font-semibold"> {comment.author.fullName} </span>

      <h1>{comment.text}</h1>

      <button
        className="px-2 hover:text-blue-700"
        onClick={() => handleLike(comment.id)}
      >
        Like {comment.likes.length <= 0 ? "" : comment.likes.length}
      </button>
      <button
        className="px-2 hover:text-blue-700"
        onClick={() => handleDislike(comment.id)}
      >
        Dislike {comment.dislikes.length <= 0 ? "" : comment.dislikes.length}
      </button>
      <button className="px-2" onClick={() => handleReply(comment.id)}>
        Reply
      </button>
      {isCommentOwner && user && (
        <button
          className="px-2 hover:text-blue-700"
          onClick={() => handleEdit(comment)}
        >
          Edit
        </button>
      )}
      {isCommentOwner && user && (
        <button
          className="px-2 hover:text-blue-700"
          onClick={() => handleDelete(comment.id)}
        >
          Delete
        </button>
      )}
      {editingComment.id === comment.id ? (
        <form onSubmit={handleSubmitEdit}>
          <input
            type="text"
            value={editingComment.text}
            onChange={(e) =>
              setEditingComment({ ...editingComment, text: e.target.value })
            }
          />
          <button type="submit">Save</button>
        </form>
      ) : null}
    </div>
  );
}
