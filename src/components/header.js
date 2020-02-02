import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authProvider } from '../authProvider';
import { AuthenticationState } from 'react-aad-msal';

const Header = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const account = authProvider.getAccountInfo();

        if(authProvider.authenticationState !== AuthenticationState.Authenticated) {
            setUsername('');
            setIsLoggedIn(false);
        }
        else {
            if(account !== undefined) {
                setUsername(account.account.name);
                setIsLoggedIn(true);
            }
            else {
                setUsername('');
                setIsLoggedIn(false);
            }
        }        
    },[username]);

    const logout = () => {
        authProvider.logout();
        setUsername('');
        setIsLoggedIn(false);
    }

    const login = () => {
        authProvider.login().then(() => {
                const account = authProvider.getAccountInfo();
                if(account !== undefined) {
                    setUsername(account.account.name);
                    setIsLoggedIn(true);
                }
                else {
                    setUsername('');
                    setIsLoggedIn(false);
                }
            }
        );
    }    

    const editProfile = () => {
         alert('Not implemented yet.');
    }

    const changePassword = () => {
        alert('Not implemented yet.');
   }

    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Alexander-Neumann.Net</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/weather">Wetter</Nav.Link>
                    <Nav.Link as={Link} to="/claims">Claims</Nav.Link>
                    <Nav.Link as={Link} to="/training/running">Lauftraining</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    {isLoggedIn &&
                        <NavDropdown title={"Hallo " + username} id="nav-dropdown" alignRight={true}>
                            <Nav.Link onClick={editProfile}>Profil bearbeiten</Nav.Link>
                            <Nav.Link onClick={changePassword}>Passwort ändern</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </NavDropdown>
                    }
                    {!isLoggedIn && <Nav.Link onClick={login}>Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;