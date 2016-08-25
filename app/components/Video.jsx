import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ResponsiveEmbed, Well } from 'react-bootstrap';

const Video = ({vid}) => {
    const url = `https://www.youtube.com/embed/${vid}`
    return(
        <div>
            <ResponsiveEmbed a16by9>
                <embed type="text/html" src={url} />
            </ResponsiveEmbed>
        </div>
    );
};


function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        vid: ownProps.vid
    };
}

export default connect(mapStateToProps)(Video);
