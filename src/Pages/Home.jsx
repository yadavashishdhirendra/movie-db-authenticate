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
  console.log(user);

  //   Movie List State
  const { movies, loading } = useSelector((state) => state.movie);

  const [Movies, setMovies] = useState([]);

  //   Logout Function
  const handleLogout = () => {
    secureLocalStorage.removeItem("user_watch_list");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  //   Initially Load Movie
  useEffect(() => {
    dispatch(GetAllMovieActions("movie", 1));
  }, [dispatch]);

  //   If All Ok Push Data
  useEffect(() => {
    if (movies?.Response === "True") {
      setMovies(movies?.Search);
    }
  }, [movies?.Search, movies?.Response]);

  console.log("MOVIES: ", Movies);

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper-container-grid-row">
          <div>
            {/* First Child*/}
            {/* SideBar  */}
            <SideBar />
            {/* SideBar */}
          </div>
          <div>
            {/* Header User Info */}
            <div className="header-info">
              <h3>Welcome, {user.name}</h3>
              <Button onClick={() => handleLogout()}>
                <CiLogout size={28} />
              </Button>
            </div>
            {/* Header User Info */}

            {/* Static Container */}
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
            {/* Static Container */}

            {/* Input */}
            <div className="input-container">
              <input type="text" name="" id="" placeholder="Enter Movie Name" />
              <Button>Search</Button>
            </div>
            {/* Input */}

            {/* Movie Data */}
            {loading ? (
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
                      />
                    ))
                  : null}
              </div>
            )}
            {/* Movie Data */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
