import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from 'containers/Navigation';
import { Button, ResponsiveEmbed } from 'react-bootstrap';



/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({ children, vid }) => {
  return (
    <div >
      <Navigation vid={vid}  />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        vid: ownProps.params.id
    }
}

export default connect(mapStateToProps)(App);
