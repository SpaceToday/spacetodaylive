import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Scoreboard from 'components/Scoreboard';

export default class ChatPanel extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("HERE");
        this.setState( () => (
            <embed
                fill
                src={`https://www.youtube.com/live_chat?v=${this.props.vid}&embed_domain=${location.hostname}`}
                style={{height:'65vh', width: '100%'}}/>)
            );
    }

    componentWillUnmount() {

    }

    render(){
        const { vid } = this.props;
        return(
            <Panel collapsible header="Live Chat" bsStyle="warning">
                {this.state}
            </Panel>
        )
    }
}
