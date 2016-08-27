import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';


const EntryBox = ({makeQuestion, typingQuestion, textOnBox, vid}) => {

    const handleChange = (e) => {
        typingQuestion(e.target.value);
    }

    const sendButton = () => {
        if( !textOnBox || textOnBox=='' || !textOnBox.split('').some(e=>e!=' ') ) return;
        makeQuestion(vid);
    }

    return (
        <form>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Pergunta</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    placeholder="Pergunte algo interessante"
                    onChange={handleChange}
                    value={textOnBox} />
            </FormGroup>
            <Button onClick={sendButton}>
                Lançar!
            </Button>
        </form>
    );
}
export default EntryBox;
