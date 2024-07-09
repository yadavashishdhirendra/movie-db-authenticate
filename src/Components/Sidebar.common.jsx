import React, { Fragment, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Icon from "../Assets/Images/Logo.png";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";

const Sidebar_Menu = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "My List",
    url: "/watch-list",
  },
];

const SidebarCommon = () => {
  let user = JSON.parse(secureLocalStorage.getItem("user_watch_list"));

  const [isOpen] = useState(false);
  return (
    <Fragment>
      <div className="sidebar-container">
        <div className="logo-container">
          <img src={Icon} alt={Icon} />
        </div>
        <Sidebar
          collapsed={isOpen}
          rootStyles={{
            color: "white",
            fontFamily: "Krona One",
            fontSize: "12px",
          }}
        >
          <Menu>
            {Sidebar_Menu &&
              Sidebar_Menu?.map((i, index) => (
                <Fragment key={index}>
                  <MenuItem component={<Link to={`${i.url}`} />}>
                    {i.name}{" "}
                    <div>
                      {index === 1 ? user?.bookmarks?.length || 0 : null}
                    </div>
                  </MenuItem>
                </Fragment>
              ))}
          </Menu>
        </Sidebar>
      </div>
    </Fragment>
  );
};

export default SidebarCommon;
