import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Header, Collapse, Brand, Toggle, Text } from 'react-bootstrap/lib/Navbar';

const Navigation = ({ user, logOut, vid }) => {
    const authUrl = `/auth/google?vid=${vid}`;
    return (
        <Navbar inverse>
            <Header>
                <Brand>
                    <a href="/">Space Today Live</a>
                </Brand>
                <Toggle />
            </Header>
            <Collapse>
                <Nav>
                    { user.authenticated ? (
                        <NavItem onClick={logOut} >Logout</NavItem>
                    ) : (
                        <NavItem eventKey={1} href={authUrl}>Login</NavItem>
                    )}
                </Nav>
                { user.authenticated ? (
                    <Text pullRight> { user.profile.name } </Text>
                ) : "" }
            </Collapse>
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
