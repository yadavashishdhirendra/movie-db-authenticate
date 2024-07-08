import React, { Fragment, useEffect, useState } from "react";
import { default as SideBar } from "../Components/Sidebar.common";
import { default as Moviez } from "../Components/Movies";
import secureLocalStorage from "react-secure-storage";
import { IoBookmark } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetAllMovieActions } from "../Actions/Tmoviez.actions";
import Loading from "../Components/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = JSON.parse(secureLocalStorage.getItem("user_watch_list"));

  const { movies, loading } = useSelector((state) => state.movie);
  const [Movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State to track the current page

  const [stopLoader, setStopLoader] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [watchListCount, setWatchListCount] = useState(null);

  const handleLogout = () => {
    secureLocalStorage.removeItem("user_watch_list");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    dispatch(GetAllMovieActions("movie", page));
  }, [dispatch, page]);

  useEffect(() => {
    if (movies?.Response === "True") {
      setMovies((prevMovies) => [...prevMovies, ...movies?.Search]);
    }
  }, [movies?.Search, movies?.Response]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      setStopLoader(false);
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setScrollLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("WatchListCount: ", watchListCount);
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper-container-grid-row">
          <div>
            <SideBar watchListCount={watchListCount} />
          </div>
          <div>
            <div className="header-info">
              <h3>Welcome, {user.name}</h3>
              <Button onClick={() => handleLogout()}>
                <CiLogout size={28} />
              </Button>
            </div>
            <div className="watch-list-container">
              <h1>
                Welcome to, <span>Tiny Moviez</span>
              </h1>
              <p>
                Browse movies, add them to watchlists and share them with
                friends.
              </p>
              <p>
                Just click the <IoBookmark color="#E76F51" /> to add a movie,
                the poster to see more details marked the video as watched.
              </p>
            </div>
            <div className="input-container">
              <input type="text" name="" id="" placeholder="Enter Movie Name" />
              <Button>Search</Button>
            </div>
            {loading && stopLoader ? (
              <Loading mt={true} color={"white"} size={48} />
            ) : (
              <div className="movie-list-grid-row">
                {Movies && Movies?.length > 0
                  ? Movies.map((i, index) => (
                      <Moviez
                        key={index}
                        poster={i.Poster}
                        title={i.Title}
                        year={i.Year}
                        imdbId={i.imdbID}
                        user={user}
                        setWatchListCount={setWatchListCount}
                      />
                    ))
                  : null}
              </div>
            )}
            {scrollLoading && <Loading mt={true} color={"white"} size={48} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
