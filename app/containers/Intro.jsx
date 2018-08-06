import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col, Well, Thumbnail, Panel, PageHeader } from 'react-bootstrap';
import Video from 'components/Video';

const Intro = ({past, upcoming, live}) => {

    const IntroItens = ({list, big}) => {
        const thumbItems = list.map((e, i) =>{
            return (
                <Col xs={big?12:6} sm={big?6:3} key={i}>
                    <Link to={`/v/${e.id.videoId}`}>
                        <Thumbnail src={e.snippet.thumbnails.high.url}>
                            <p>{e.snippet.title}</p>
                        </Thumbnail>
                    </Link>
                </Col>
            )
        })
        return (
            <div>
                {thumbItems}
            </div>
        )
    }

    return (
      <Grid fluid>
          {live.length?(
                <Row>
                    <PageHeader>LIVES <small>acontecendo agora</small></PageHeader>
                    <IntroItens list={live} big />
                </Row>
            ):null}
            {upcoming.length?(
                  <Row>
                      <PageHeader>LIVES <small>programadas</small></PageHeader>
                      <IntroItens list={upcoming} big />
                  </Row>
              ):null}
              {past.length?(
                    <Row>
                        <PageHeader>Videos <small>anteriores</small></PageHeader>
                        <IntroItens list={past} />
                    </Row>
                ):null}
      </Grid>
    );
};


function mapStateToProps(state, ownProps) {
    return {
        past: state.intro.past,
        upcoming: state.intro.upcoming,
        live: state.intro.live
    };
}

export default connect(mapStateToProps)(Intro);
