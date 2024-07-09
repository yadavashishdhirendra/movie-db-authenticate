import React, { Fragment, useEffect, useState } from "react";
import SideBar from "../Components/Sidebar.common";
import Moviez from "../Components/Movies";
import secureLocalStorage from "react-secure-storage";
import { IoBookmark } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetAllMovieActions } from "../Actions/Tmoviez.actions";
import Loading from "../Components/Loading";
import MetaTitle from "../Components/Meta.name";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(secureLocalStorage.getItem("user_watch_list"));

  const { movies, loading } = useSelector((state) => state.movie);

  const [Movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("dragon");
  const [stopLoader, setStopLoader] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(keyword);

  const handleLogout = () => {
    secureLocalStorage.removeItem("user_watch_list");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    if (!isError && !isTyping) {
      dispatch(GetAllMovieActions(debouncedValue, page));
    }
  }, [dispatch, page, debouncedValue, isError, isTyping]);

  useEffect(() => {
    if (movies?.Response === "True") {
      setMovies((prevMovies) => {
        const allMovies =
          page === 1 ? movies?.Search : [...prevMovies, ...movies?.Search];

        const uniqueMovies = Array.from(
          new Set(allMovies.map((movie) => movie.imdbID))
        ).map((id) => allMovies.find((movie) => movie.imdbID === id));

        return uniqueMovies;
      });
      setScrollLoading(false);
    } else if (movies?.Response === "False") {
      toast.error(movies.Error);
      setIsError(true);
      setScrollLoading(false);
    }
  }, [movies, page]);

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
    setIsTyping(false);
    setIsError(false);
    setStopLoader(true);
    setMovies([]);
    setPage(1);
    await dispatch(GetAllMovieActions(debouncedValue, 1));
  };

  const handleKeyword = (val) => {
    setIsError(false);
    setIsTyping(true);
    setPage(1);
    setKeyword(val);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  return (
    <Fragment>
      <MetaTitle title={`Tiny Moviez`} />

      <div className="container">
        <div className="wrapper-container-grid-row">
          <div>
            <SideBar />
          </div>
          <div>
            <div className="header-info">
              <h3>Welcome, {user.name}</h3>
              <Button onClick={handleLogout}>
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
                the poster to see more details, and mark the video as watched.
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
