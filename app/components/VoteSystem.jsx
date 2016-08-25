import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ResponsiveEmbed, Well, Badge, Glyphicon } from 'react-bootstrap';
import { thumbsUp } from 'actions/questions';

const VoteSystem = ({ vid, question, user, thumbsUp }) => {

    const thumbsUpClick = () => {
        thumbsUp(vid, question.id);
    }

    return(
        <div>
            <Button bsSize="xsmall" onClick={thumbsUpClick}>
                <Glyphicon glyph="arrow-up" />
            </Button>
            <Badge>{question.count}</Badge>
            <Button bsSize="xsmall" >
                <Glyphicon glyph="arrow-down" />
            </Button>
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
