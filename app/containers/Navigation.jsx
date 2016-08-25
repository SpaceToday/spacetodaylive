import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = ({ user, logOut, vid }) => {
    const authUrl = `/auth/google?vid=${vid}`;
    return (
        <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Space Today Live</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    { user.authenticated ? (
                        <NavItem onClick={logOut} >Logout</NavItem>
                    ) : (
                        <NavItem eventKey={1} href={authUrl}>Login</NavItem>
                    )}
                </Nav>
                { user.authenticated ? (
                    <Navbar.Text pullRight> { user.profile.name } </Navbar.Text>
                ) : "" }
            </Navbar.Collapse>
        </Navbar>
    )
}


Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        vid: ownProps.vid
    };
}

export default connect( mapStateToProps, { logOut })(Navigation);
