import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';


const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  
  color: white;
  text-decoration: none;
  position: relative;
  z-index: 3;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 30px;
  letter-spacing: 0px;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center; /* Add this line to align items vertically */
  
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const Wrapper2 = styled.div`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  cursor: pointer;
  position: relative;

  ${props =>
    props.session &&
    `
    &:hover::after {
      content: 'Logout';
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background-color: #000000;
      color: #ffffff;
      padding: 6px 12px;
      font-size: 14px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover::before {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: #000000;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover::after,
    &:hover::before {
      opacity: 1;
    }
  `}
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;


const SearchContainer = styled.div`
  position: relative;
  margin-left: 20px; margin-right: 10px;
  flex-grow: 1;

  
`;
const SearchBar = styled.input`
  width: 100%;
  padding: 5px; padding-right:0px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
`;
const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  padding: 0px;
  margin: 0%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const SearchIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  const {data: session} = useSession();



  const router = useRouter();
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // Implement your search functionality here
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    router.push(`/searchPage?search=${encodeURIComponent(searchTerm)}`);
  };
  

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Top⚡Tech</Logo>

                  <SearchContainer>
                <form onSubmit={handleSearchSubmit}>
                  <SearchBar type="text" name="search" placeholder="Search for products" onChange={handleSearch} />
                  <SearchButton type="submit">
                    <SearchIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </SearchIcon>
                  </SearchButton>
                </form>
              </SearchContainer>

          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/cart'}>Cart({cartProducts.length})</NavLink>


            <Wrapper2 session={session} onClick={!session ? signIn : signOut}  >
              
                {session ? `${session.user.name}` : 'Sign In' }
             
            </Wrapper2>
            
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}