import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

/* ================= STYLES ================= */

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + "20"};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.img`
  height: 42px;
`;

const MobileIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  position: absolute;
  top: 80px;
  right: 0;
  width: 90%;
  padding: 16px 40px 24px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.bg};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  transform: ${({ $open }) =>
    $open ? "translateY(0)" : "translateY(-120%)"};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: all 0.4s ease;
  z-index: ${({ $open }) => ($open ? 1000 : -1000)};
`;

/* ================= COMPONENT ================= */

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userInitial =
    currentUser?.name?.charAt(0)?.toUpperCase() ?? "U";

  const closeMenu = () => setOpen(false);

  return (
    <Nav>
      <NavContainer>
        <MobileIcon
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <MenuRounded />
        </MobileIcon>

        <NavLogo to="/" onClick={closeMenu}>
          <Logo src={LogoImg} alt="Fittrack Logo" />
          Fittrack
        </NavLogo>

        <MobileMenu $open={open}>
          <Navlink to="/" onClick={closeMenu}>Dashboard</Navlink>
          <Navlink to="/workouts" onClick={closeMenu}>Workouts</Navlink>
          <Navlink to="/tutorials" onClick={closeMenu}>Tutorials</Navlink>
          <Navlink to="/blogs" onClick={closeMenu}>Blogs</Navlink>
          <Navlink to="/contact" onClick={closeMenu}>Contact</Navlink>
        </MobileMenu>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/tutorials">Tutorials</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar src={currentUser?.img}>
            {userInitial}
          </Avatar>
          <TextButton onClick={() => dispatch(logout())}>
            Logout
          </TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
