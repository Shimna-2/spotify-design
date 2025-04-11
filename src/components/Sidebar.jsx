import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/uiSlice";
import "./SideBar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ui.activeTab);

  return (
    <div className="sidebar">
      <div className="logo">
        <img
          className="spoto"
          src="https://cdn-icons-png.flaticon.com/128/2111/2111624.png"
        />
        <h2 className="sidebar-logo">SPOTIFY</h2>
      </div>
      <div className="divte">
        <h2>FOR YOU</h2>

        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link
              active={activeTab === "all"}
              onClick={() => dispatch(setActiveTab("all"))}
            >
              All Songs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "favourites"}
              onClick={() => dispatch(setActiveTab("favourites"))}
            >
              Favourites
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "recent"}
              onClick={() => dispatch(setActiveTab("recent"))}
            >
              Recently Played
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
