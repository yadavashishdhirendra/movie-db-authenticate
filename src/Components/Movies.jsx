import React, { useState, useEffect } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Movies = ({ poster, title, year, imdbId, user }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (
      user.bookmarks &&
      user.bookmarks.some((bookmark) => bookmark.imdbId === imdbId)
    ) {
      setIsBookmarked(true);
    }
  }, [user.bookmarks, imdbId]);

  const handleSaved = (imdbId, name, poster, yr) => {
    let updatedUser = { ...user };

    if (!updatedUser.bookmarks) {
      updatedUser.bookmarks = [];
    }

    if (isBookmarked) {
      updatedUser.bookmarks = updatedUser.bookmarks.filter(
        (bookmark) => bookmark.imdbId !== imdbId
      );
      setIsBookmarked(false);
    } else {
      updatedUser.bookmarks.push({
        imdbId: imdbId,
        title: name,
        img: poster,
        year: yr,
      });
      setIsBookmarked(true);
    }
    secureLocalStorage.setItem("user_watch_list", JSON.stringify(updatedUser));
  };

  console.log("USER: ", user);

  return (
    <Link>
      <img src={poster} alt="" />
      <h4>{title?.length > 22 ? title.slice(0, 22) + "..." : title}</h4>
      <div className="watchlist-content">
        <p>{year}</p>
        <div onClick={() => handleSaved(imdbId, title, poster, year)}>
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
