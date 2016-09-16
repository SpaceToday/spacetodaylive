import React, { PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col, Label, Button, Well, Jumbotron, Media, Image } from 'react-bootstrap';
import { List as MediaList, Body as MediaBody, Left as MediaLeft, Heading as MediaHeading, ListItem as MediaListItem } from 'react-bootstrap/lib/Media';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { remove } from 'actions/questions'

const MyQuestionsPanel = ({ questions, vid, user, remove }) => {
    const questionListItems = questions.filter( question =>
        question.user.google == user.google
    ).map((question, key) => {
        const clickRemove = () => {
            remove(vid, question.id);
        }
        return (
            <ListGroupItem key={key}>
                <Button bsSize="small" bsStyle='danger' onClick={clickRemove}>
                    <FontAwesome name='trash' />
                </Button>
                {question.text}
            </ListGroupItem>
        )
    });

    return(
        <Panel header="Minhas Perguntas" bsStyle="info" collapsible defaultExpanded eventKey="2">
            <ListGroup fill>
                {questionListItems}
            </ListGroup>
        </Panel>
    )
}

MyQuestionsPanel.propTypes = {
    questions: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        questions: state.question.questions,
        user: state.user,
        vid: ownProps.vid
    }
}

export default connect(mapStateToProps, { remove } )(MyQuestionsPanel);
