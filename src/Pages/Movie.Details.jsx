import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetMovieByIdActions } from "../Actions/Tmoviez.actions";
import SideBar from "../Components/Sidebar.common";
import { CiLogout } from "react-icons/ci";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import MetaTitle from "../Components/Meta.name";

const MovieDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = JSON.parse(secureLocalStorage.getItem("user_watch_list"));

  // Get Movie By Id State
  const { Single_Movie, loading } = useSelector((state) => state.SingleMovie);

  const handleLogout = () => {
    secureLocalStorage.removeItem("user_watch_list");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    if (id) {
      dispatch(GetMovieByIdActions(id));
    }
  }, [dispatch, id]);

  console.log("Movie Details: ", Single_Movie);

  return (
    <Fragment>
      <MetaTitle
        title={`${
          loading ? "Loading..." : `Tiny Moviez - ${Single_Movie?.Title}`
        }`}
      />

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

            <div className="back-arrow" onClick={() => navigate(-1)}>
              <FaArrowLeftLong />
              <p>Go Back</p>
            </div>

            {/* Movie Details  */}
            {loading ? (
              <Loading color={"white"} size={42} height={true} />
            ) : (
              <div className="movie-details-container">
                <div>
                  <img src={Single_Movie?.Poster} alt="" />
                </div>
                <div>
                  <h1>{Single_Movie?.Title}</h1>
                  <p>{Single_Movie?.Plot}</p>
                </div>
              </div>
            )}
            {/* Movie Details */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieDetails;
