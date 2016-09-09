import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Main from 'containers/Main';
import Intro from 'containers/Intro';
import { isOwner } from 'actions/users';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
    const ownerVerification =  (nextState, replace, callback) => {
        const state = store.getState();
        if(state.user && state.user.authenticated)
            store.dispatch(isOwner(nextState.params.id));
        callback();
    }

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Intro} />
            <Route path="/:id" component={Main} onEnter={ownerVerification} />
        </Route>
    );
};
