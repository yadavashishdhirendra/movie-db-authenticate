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
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("dragon"); // Initialize with default keyword
  const [stopLoader, setStopLoader] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  //   const [isTyping, setIsTyping] = useState(false);

  const handleLogout = () => {
    secureLocalStorage.removeItem("user_watch_list");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    if (!isError) {
      dispatch(GetAllMovieActions(keyword, page));
    }
  }, [dispatch, page, keyword, isError]);

  useEffect(() => {
    if (movies?.Response === "True") {
      setMovies((prevMovies) =>
        page === 1 ? movies?.Search : [...prevMovies, ...movies?.Search]
      );
      setScrollLoading(false);
    }
    if (movies?.Response === "False") {
      toast.error(movies.Error);
      setIsError(true);
      setScrollLoading(false);
    }
  }, [movies?.Search, movies?.Response, page, movies?.Error]);

  useEffect(() => {
    const handleScroll = () => {
      setStopLoader(false);
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        setScrollLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setStopLoader(true);
    setMovies([]);
    setPage(1);
    await dispatch(GetAllMovieActions(keyword, 1));
  };

  const handleKeyword = (val) => {
    // setIsTyping(true);
    setPage(1);
    setKeyword(val);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper-container-grid-row">
          <div>
            <SideBar />
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
            <form onSubmit={handleSearch} className="input-container">
              <input
                type="text"
                name="keyword"
                id="keyword"
                onChange={(e) => handleKeyword(e.target.value)}
                value={keyword}
                placeholder="Enter Movie Name"
              />
              <Button type="submit">Search</Button>
            </form>
            {loading && stopLoader ? (
              <Loading mt={true} color={"white"} size={48} />
            ) : (
              <div className="movie-list-grid-row">
                {Movies && Movies.length > 0
                  ? Movies.map((i, index) => (
                      <Moviez
                        key={index}
                        poster={i.Poster}
                        title={i.Title}
                        year={i.Year}
                        imdbId={i.imdbID}
                        user={user}
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
