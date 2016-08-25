import { combineReducers } from 'redux';
import * as types from 'types';


const question = (
    state,
    action
) => {

}

const questions = (
    state = [],
    action
) => {
    switch (action.type) {
        case types.GET_QUESTIONS_SUCCESS:
            return action.res.data;
        default:
            return state;
    }
}

const newQuestion = (
    state = '',
    action
) => {
    switch (action.type) {
        case types.QUESTION_TYPING:
            return action.newQuestion;
        case types.CREATE_QUESTION_REQUEST:
            return '';
        default:
            return state;
    }
}

const questionReducer = combineReducers({
    questions,
    newQuestion
})

export default questionReducer;
