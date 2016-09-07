import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Panel, PanelGroup, Col, Clearfix, Button, Accordion, ResponsiveEmbed } from 'react-bootstrap';
import Video from 'components/Video';
import EntryBox from 'components/EntryBox';
import ScorePanel from 'components/ScorePanel';
import ChatPanel from 'components/ChatPanel';
import MyQuestionsPanel from 'components/MyQuestionsPanel';
import { createQuestion, typing, fecthQuestions } from 'actions/questions';
import FontAwesome from 'react-fontawesome';

const Main = ({ user, vid, createQuestion, typing, textOnBox, fecthQuestions, questions }) => {
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
                          textOnBox={textOnBox}
                          questions={questions}
                          user={user} />
                  ) : (
                      <Panel>
                          <Button bsStyle="danger" href={authUrl} > Login <FontAwesome name='youtube' size='lg' /></Button> para fazer perguntas
                      </Panel>
                  ) }
              </Col>
              <Col sm={5}>
                  {//TODO Accordion not working
                  }
                <PanelGroup defaultActiveKey="2" accordion>
                    <ScorePanel
                        fecthQuestions={fecthQuestions}
                        vid={vid} />
                    {user.authenticated ? (
                        <MyQuestionsPanel
                            vid={vid} />
                    ):(null)}
                    <ChatPanel vid={vid} />
                </PanelGroup>
              </Col>
          </Row>
      </Grid>
    );
};


function mapStateToProps(state, ownProps) {
    //console.log(require('util').inspect(state, { depth: null }));
    //console.log(require('util').inspect(ownProps, { depth: null }));
    return {
        user: state.user,
        vid: ownProps.params.id,
        textOnBox: state.question.newQuestion,
        questions: state.question.questions
    };
}

export default connect(mapStateToProps, {createQuestion, typing, fecthQuestions} )(Main);
