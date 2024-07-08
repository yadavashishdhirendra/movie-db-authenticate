import React, { Fragment, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Icon from "../Assets/Images/Logo.png";

const SidebarCommon = ({ watchListCount }) => {
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
            {/* <SubMenu label="Charts"> */}
            <MenuItem> Home </MenuItem>
            <MenuItem>
              {" "}
              My Lists <div>{watchListCount}</div>
            </MenuItem>
            {/* </SubMenu> */}
            {/* <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
          </Menu>
        </Sidebar>
      </div>
    </Fragment>
  );
};

export default SidebarCommon;
