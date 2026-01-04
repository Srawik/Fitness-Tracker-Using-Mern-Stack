import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

/* ================= STYLES ================= */

const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 10;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    padding: 24px;
  }
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-left: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

/* ================= COMPONENT ================= */

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <Left>
        <Logo src={LogoImage} alt="Fittrack Logo" />
        <Image src={AuthImage} alt="Fitness background" />
      </Left>

      <Right>
        {isLogin ? (
          <>
            <SignIn />
            <Text>
              Don&apos;t have an account?
              <TextButton onClick={() => setIsLogin(false)}>
                Sign Up
              </TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Already have an account?
              <TextButton onClick={() => setIsLogin(true)}>
                Sign In
              </TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Authentication;
