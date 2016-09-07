import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Scoreboard from 'components/Scoreboard';

export default class ScorePanel extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fecthQuestions, vid } = this.props;
        fecthQuestions(vid);
        setInterval(() => {
            const { fecthQuestions } = this.props;
            fecthQuestions(vid);
        }, 20000);
    }

    componentWillUnmount() {

    }

    render(){
        const { vid } = this.props;
        return(
            <Panel header="Perguntas em Orbita" bsStyle="info" collapsible eventKey="3">
                <Scoreboard fill vid={vid} />
            </Panel>
        )
    }
}
