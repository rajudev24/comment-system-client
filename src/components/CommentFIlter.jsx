/* eslint-disable react/prop-types */
function CommentFilter({ sortBy, setSortBy, sortOrder, setSortOrder }) {
  return (
    <div className="p-2">
      <span>Filter By: </span>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="likes">Most Like</option>
        <option value="dislikes">Most Dislike</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
    </div>
  );
}

export default CommentFilter;
