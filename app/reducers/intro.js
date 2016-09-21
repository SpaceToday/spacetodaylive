import * as types from 'types';
import { combineReducers } from 'redux';


const live = (
    state = [],
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
}

const upcoming = (
    state = [],
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
}

const past = (
    state = [],
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
}

const introReducer = combineReducers({
    live,
    upcoming,
    past
});

export default introReducer;
