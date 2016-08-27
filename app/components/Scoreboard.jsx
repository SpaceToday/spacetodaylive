import React, { PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col, Label, Button, Well, Jumbotron } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import VoteSystem from 'components/VoteSystem';
import { connect } from 'react-redux';
import { remove } from 'actions/questions'

const Scoreboard = ({ questions, vid, user, remove }) => {


    const questionListItems = questions.sort((a,b) => {return b.count - a.count})
    .map((question, key) => {
        const clickRemove = () => {
            remove(vid, question.id);
        }
        return (
            //TODO add style to my message
            <ListGroupItem key={key} >
                <Grid fluid>
                    <Row>
                        <Col xs={3}>
                            <VoteSystem vid={vid} question={question} />
                        </Col>
                        <Col xs={7}>
                             {question.user.profile.name}
                        </Col>
                        <Col xs={2}>
                            { user.authenticated && user.google==question.user.google?(
                                <Button bsSize="xsmall" bsStyle='danger' onClick={clickRemove}>
                                    <FontAwesome name='trash' />
                                </Button>
                            ):(
                                <div></div>
                            ) }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Well bsSize="small">{question.text}</Well>
                        </Col>
                    </Row>
                </Grid>
            </ListGroupItem>
        );
    });
    return (
        <ListGroup>
            {questionListItems}
        </ListGroup>
    );
};

Scoreboard.propTypes = {
    questions: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        questions: state.question.questions,
        user: state.user,
        vid: ownProps.vid
    }
}

export default connect(mapStateToProps, { remove } )(Scoreboard);
