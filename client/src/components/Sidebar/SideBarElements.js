import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

export const SideBarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  background: #0d0d0d;
`;

export const CloseIcon = styled(FaTimes)`
  color: green;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  font-size: 2rem;
  background: transparent;
  cursor: pointer;
  outline: none;
`;

export const SideBarWrapper = styled.div`
  color: #fff;
`;

export const SideBarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5 rem;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

export const SideBarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  } ;
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const SideBarRoute = styled(Link)`
  border-radius: 50px;
  background: #266150;
  white-space: nowrap;
  padding: 15px 60px;
  color: #fdf8f5;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 40px;

  &:hover {
    transition: all 0.2 ease-in-out;
    background: #3d9c80;
  }
`;
