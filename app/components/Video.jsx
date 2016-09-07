import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ResponsiveEmbed, Well } from 'react-bootstrap';

const Video = ({vid}) => {
    const url = `https://www.youtube.com/embed/${vid}?autoplay=${__DEVSERVER__||__DEVCLIENT__?0:1}`
    return(
        <div style={{boxShadow: '15px 15px 20px lightblue'}}>
            <ResponsiveEmbed a16by9 >
                <embed src={url} />
            </ResponsiveEmbed>
        </div>
    );
};


export default Video;
