import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Movies = ({ poster, title, year }) => {
  let isBookmarked = false;
  return (
    <div>
      <img src={poster} alt="" />
      <h4>{title?.length > 22 ? title.slice(0, 22) + "..." : title}</h4>
      <div className="watchlist-content">
        <p>{year}</p>
        <div>
          {isBookmarked ? (
            <IoBookmark color="white" />
          ) : (
            <IoBookmarkOutline color="white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
