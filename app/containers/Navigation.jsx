import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = ({ user, logOut }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Space Today Live</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                { user.authenticated ? (
                    <NavItem onClick={logOut} href="/">Logout</NavItem>
                ) : (
                    <NavItem eventKey={1} href="/auth/google">Login</NavItem>
                )}
            </Nav>
        </Navbar>
    )
}


Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
