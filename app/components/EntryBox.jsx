import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


const EntryBox = () => {
    return (
        <form>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Pergunta</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Pergunte algo interessante" />
            </FormGroup>
            <Button type="submit">
                Enviar
            </Button>
        </form>
    );
}
/*
// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, topic}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>Vote for your top hack idea</h1>
      <TopicTextInput
        className={cx('input')}
        value={topic}
        placeholder="Suggest a hackday idea . . ."
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  topic: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};
*/
export default EntryBox;
