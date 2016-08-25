import React, { PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col, Label } from 'react-bootstrap';
import VoteSystem from 'components/VoteSystem';

const Scoreboard = ({ questions, vid, user }) => {
    const questionListItems = questions.sort((a,b) => {return b.count - a.count})
    .map((question, key) => {
        return (
            <ListGroupItem key={key} bsStyle={question.user.google==user.google?'info':''}>
                <p>
                    <VoteSystem vid={vid} question={question} />
                    {question.user.profile.name}
                </p>
                {question.text}
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

export default Scoreboard;
