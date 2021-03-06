import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { Header, Collapse, Brand, Toggle, Text } from 'react-bootstrap/lib/Navbar';

const Navigation = ({ user, logOut, pathname }) => {
    const authUrl = `/auth/google?state=${pathname}`;
    return (
        <Navbar inverse fluid>
            <Header>
                <Brand>
                    <Link to={'/'}>Space Today Live</Link>
                </Brand>
                <Toggle />
            </Header>
            <Collapse>
                { user.authenticated ? (
                    <Nav pullRight>
                        <NavDropdown title={user.profile.name} id="user-dropdown">
                            <MenuItem eventKey="1" onClick={logOut}>
                                Log out
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                ) : (
                    <Nav pullRight>
                            <NavItem eventKey={1} href={authUrl}>Login</NavItem>
                    </Nav>
                )}
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
