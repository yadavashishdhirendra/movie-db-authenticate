import React, { Fragment } from "react";
import SideBar from "../Components/Sidebar.common";
import Moviez from "../Components/Movies";
import secureLocalStorage from "react-secure-storage";
import { Button } from "@mui/material";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WatchList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(secureLocalStorage.getItem("user_watch_list"));

  const handleLogout = () => {
    secureLocalStorage.removeItem("user_watch_list");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  console.log("USER: ", user);
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
              <Button onClick={handleLogout}>
                <CiLogout size={28} />
              </Button>
            </div>

            {/* WatchList Data */}
            <div className="movie-list-grid-row">
              {user.bookmarks && user.bookmarks.length > 0
                ? user.bookmarks.map((i, index) => (
                    <Moviez
                      key={index}
                      poster={i.img}
                      title={i.title}
                      year={i.year}
                      imdbId={i.imdbId}
                      user={user}
                    />
                  ))
                : null}
            </div>
            {/* WatchList Data */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WatchList;
