import * as types from 'types';
import { combineReducers } from 'redux';


const live = (
    state = [],
    action
) => {
    switch (action.type) {
        case types.INTRO_PAST:
            return action.data.filter(e=>e.snippet.liveBroadcastContent==="live")
        default:
            return state;
    }
}

const upcoming = (
    state = [],
    action
) => {
    switch (action.type) {
        case types.INTRO_PAST:
            return action.data.filter(e=>e.snippet.liveBroadcastContent==="upcoming") 
        default:
            return state;
    }
}

const past = (
    state = [],
    action
) => {
    switch (action.type) {
        case types.INTRO_PAST:
            return action.data;
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
