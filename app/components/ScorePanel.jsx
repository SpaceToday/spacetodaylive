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
        }, 10000);
    }

    componentWillUnmount() {

    }

    render(){
        const { questions, vid, user } = this.props;
        return(
            <Panel header="Perguntas em Orbita" >
                <Scoreboard fill questions={questions} vid={vid} user={user} />
            </Panel>
        )
    }
}
