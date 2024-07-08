import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router-dom";

const Movies = ({ poster, title, year, imdbId }) => {
  let isBookmarked = false;
  return (
    <Link to={`/movie-details/${imdbId}`}>
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
    </Link>
  );
};

export default Movies;
