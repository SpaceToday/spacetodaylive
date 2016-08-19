import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Well } from 'react-bootstrap';
import Video from 'components/Video';

const Intro = () => {
    return (
      <Grid>
          <Row>
              <Well>Welcome</Well>
          </Row>
      </Grid>
    );
};


function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Intro);
