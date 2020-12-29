import React from "react";
import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SideBarWrapper,
  SideBarMenu,
  SideBtnWrap,
  SideBarRoute,
  SideBarLink,
} from "./SideBarElements";

const SideBar = (props) => {
  return (
    <SideBarContainer isOpen={props.isOpen} onClick={props.toggle}>
      <Icon onClick={props.toggle}>
        <CloseIcon />
      </Icon>
      <SideBarWrapper>
        <SideBarMenu>
          <SideBarLink to="/index">Main Page</SideBarLink>
          <SideBarLink to="/event-api">Find Event</SideBarLink>
          <SideBarLink to="/add-event">Add Event</SideBarLink>
          <SideBarLink to="/invitation">Invitation Request</SideBarLink>
        </SideBarMenu>
        <SideBtnWrap>
          <SideBarRoute to="#">Log Out</SideBarRoute>
        </SideBtnWrap>
      </SideBarWrapper>
    </SideBarContainer>
  );
};

export default SideBar;
