import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Panel, Col, Clearfix } from 'react-bootstrap';
import Video from 'components/Video';
import EntryBox from 'components/EntryBox';
import ScorePanel from 'components/ScorePanel';
import { createQuestion, typing, fecthQuestions } from 'actions/questions';

const Main = ({ user, vid, createQuestion, typing, textOnBox, questions, fecthQuestions }) => {
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
                          Connete-se para fazer uma pergunta
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
