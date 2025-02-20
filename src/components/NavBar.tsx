import { Link } from 'react-router-dom';
import Logo from '@/components/icons/logo';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-height: 60px;
  margin-bottom: 1rem;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  padding: 0 1rem;
`;

const StyledLink = styled(Link)`
  color: #ebc034;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <StyledLink to="/">
            <Logo />
          </StyledLink>
        </Li>
        <Li>
          <StyledLink to="/about">About</StyledLink>
        </Li>
        <Li>
          <StyledLink to="/contact">Contact</StyledLink>
        </Li>
      </Ul>
    </Nav>
  );
}

export default NavBar;