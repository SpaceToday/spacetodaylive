import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import Video from 'components/Video';
import EntryBox from 'components/EntryBox';

const Main = ({vid}) => {
    return (
      <Grid>
          <Row>
              <Video vid={vid}/>
              <EntryBox />
          </Row>
      </Grid>
    );
};


function mapStateToProps(state, ownProps) {
    console.log('Main', ownProps);
    return {
        user: state.user,
        vid: ownProps.params.id
    };
}

export default connect(mapStateToProps)(Main);
