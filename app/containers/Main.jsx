import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Panel, Col, Clearfix, Button } from 'react-bootstrap';
import Video from 'components/Video';
import EntryBox from 'components/EntryBox';
import ScorePanel from 'components/ScorePanel';
import { createQuestion, typing, fecthQuestions } from 'actions/questions';
import FontAwesome from 'react-fontawesome';

const Main = ({ user, vid, createQuestion, typing, textOnBox, questions, fecthQuestions }) => {
    const authUrl = `/auth/google?vid=${vid}`;
    return (
      <Grid fluid>
          <Row>
              <Col sm={7}>
                  <Video vid={vid} />
              </Col>
              <Col sm={5}>
                  { user.authenticated ? (
                      <EntryBox
                          makeQuestion={createQuestion}
                          typingQuestion={typing}
                          vid={vid}
                          textOnBox={textOnBox} />
                  ) : (
                      <Panel>
                          <Button bsStyle="danger" href={authUrl} > Login <FontAwesome name='youtube' size='lg' /></Button> para fazer perguntas
                      </Panel>
                  ) }
              </Col>
              <Col sm={5}>
                  <ScorePanel
                      questions={questions}
                      fecthQuestions={fecthQuestions}
                      vid={vid}
                      user={user} />
              </Col>
          </Row>
      </Grid>
    );
};


function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        vid: ownProps.params.id,
        textOnBox: state.question.newQuestion,
        questions: state.question.questions
    };
}

export default connect(mapStateToProps, {createQuestion, typing, fecthQuestions} )(Main);
