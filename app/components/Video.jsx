import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ResponsiveEmbed, Well } from 'react-bootstrap';

const Video = ({vid}) => {
    const url = `https://www.youtube.com/embed/${vid}?autoplay=${__DEVSERVER__||__DEVCLIENT__?0:1}`
    return(
        <div>
            <ResponsiveEmbed a16by9>
                <embed type="text/html" src={url} />
            </ResponsiveEmbed>
        </div>
    );
};


export default Video;
