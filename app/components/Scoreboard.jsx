import React, { PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col, Label, Button, Well, Jumbotron, Media, Image } from 'react-bootstrap';
import { List as MediaList, Body as MediaBody, Left as MediaLeft, Heading as MediaHeading, ListItem as MediaListItem } from 'react-bootstrap/lib/Media';
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
            <MediaListItem key={key} >
                <MediaLeft>
                    <Image width={32} height={32} src={question.user.profile.picture} circle />
                </MediaLeft>
                <MediaBody>
                    <MediaHeading>
                        <VoteSystem question={question} vid={vid} />
                        {question.user.profile.name}
                    </MediaHeading>
                    {question.text}
                </MediaBody>
            </MediaListItem>
        );
    });
    const panelBodyStyle = {
        overflowY: 'auto',
        maxHeight: '65vh'
    }
    return (
        <MediaList style={panelBodyStyle}>
            {questionListItems}
        </MediaList>
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
