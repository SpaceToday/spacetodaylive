import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ResponsiveEmbed, Well, Badge, Glyphicon } from 'react-bootstrap';
import { thumbsUp, remove } from 'actions/questions';
import FontAwesome from 'react-fontawesome';


const VoteSystem = ({ vid, question, user, thumbsUp, remove }) => {

    const hasVoted = question.thumbsUp.some(e=>e==user.google);

    const thumbsUpClick = () => {
        console.log('HAS VOTED', hasVoted);
        thumbsUp(vid, question.id, !hasVoted);
    }

    const clickRemove = () => {
        console.log('HERE');
        remove(vid, question.id);
    }



    return(
        <div>
            {user.authenticated?
                 hasVoted ?(
                    <Button bsSize="xsmall" bsStyle='info' onClick={thumbsUpClick}>
                        <FontAwesome name='rocket' />
                    </Button>
                ):(
                    <Button bsSize="xsmall" onClick={thumbsUpClick}>
                        <FontAwesome name='rocket' />
                    </Button>

            ):(
                <div></div>
            )}
            <Badge>{question.count}</Badge>
            {user.authenticated && user.google==question.user.google || user.isOwner ? (
                <Button bsSize="xsmall" bsStyle='danger' onClick={clickRemove}>
                    <FontAwesome name='trash' />
                </Button>
            ):(
                <div></div>
            )}
        </div>
    );
};


function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        vid: ownProps.vid,
        question: ownProps.question
    };
}

export default connect(mapStateToProps, { thumbsUp, remove } )(VoteSystem);
