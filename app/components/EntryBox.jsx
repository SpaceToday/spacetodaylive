import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Panel, InputGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import { Button as InputGroupButton } from 'react-bootstrap/lib/InputGroup'

const EntryBox = ({makeQuestion, typingQuestion, textOnBox, vid, questions, user}) => {

    const handleChange = (e) => {
        typingQuestion(e.target.value);
    }

    const sendButton = () => {
        if( !textOnBox || textOnBox=='' || !textOnBox.split('').some(e=>e!=' ') ) return;
        makeQuestion(vid);
    }

    const popoverFocus = (
        <Popover id="popover-trigger-focus">
            <strong>Você já tem 3 questões simultâneas</strong> delete alguma ou espere uma resposta
        </Popover>
    )

    return (
        <form>
            <FormGroup controlId="formControlsTextarea">
                <InputGroup >
                    <FormControl
                        componentClass="textarea"
                        placeholder="Pergunte algo interessante"
                        onChange={handleChange}
                        value={textOnBox} />
                    <InputGroupButton>
                        { questions.filter(e => e.user.google==user.google).length>=3?(
                            <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
                                <Button bsSize="large">
                                    Lançar!
                                </Button>
                            </OverlayTrigger>
                        ):(
                            <Button bsSize="large" onClick={sendButton}>
                                Lançar!
                            </Button>
                        ) }

                    </InputGroupButton>
                </InputGroup>
            </FormGroup>
        </form>
    );
}
export default EntryBox;
