import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ResponsiveEmbed, Well, Badge, Glyphicon } from 'react-bootstrap';
import { thumbsUp } from 'actions/questions';
import FontAwesome from 'react-fontawesome';

const VoteSystem = ({ vid, question, user, thumbsUp }) => {

    const hasVoted = question.thumbsUp.some(e=>e==user.google);

    const thumbsUpClick = () => {
        console.log('HAS VOTED', hasVoted);
        thumbsUp(vid, question.id, !hasVoted);
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

export default connect(mapStateToProps, { thumbsUp } )(VoteSystem);
