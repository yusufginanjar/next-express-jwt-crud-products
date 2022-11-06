import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { login as _login, logout } from '../store/loginSlice';

export default function Navibar() {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  // const login = useSelector(state => {
  //   return state.login.login;
  // });

  useEffect(() => {
    setUser(localStorage.getItem('user_id'));
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('signing out');
      // delete localStorage.token;
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      setUser(null);
      dispatch(logout());
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div bg="dark">
      <Navbar bg="dark " variant="dark" className="Navbar bg-opacity-75">
        <Container>
          <Nav className="me-auto ">
            <Link href="/" passHref>
              <Nav.Link>Products</Nav.Link>
            </Link>
            <Link href="/new" passHref>
              <Nav.Link>Add New Product</Nav.Link>
            </Link>
          </Nav>
          {user ? (
            <Nav className="justify-content-end">
              <Link href={"/players/" + user} passHref>
                <Nav.Link>Profile</Nav.Link>
              </Link>
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            </Nav>
          ) : (
            <Nav className="justify-content-end">
              <Link href="/login" passHref>
                <Nav.Link>Sign In</Nav.Link>
              </Link>
              <Link href="/register" passHref>
                <Nav.Link>Sign Up</Nav.Link>
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
