/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();


export function makeQuestionRequest(method, id, data, api = '/question') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}

export function createQuestionRequest(){
    return {
        type: types.CREATE_QUESTION_REQUEST
    }
}

export function createQuestionSuccess(){
    return {
        type: types.CREATE_QUESTION_SUCCESS
    }
}

export function typing(text) {
  return {
    type: types.QUESTION_TYPING,
    newQuestion: text
  };
}


export function createQuestion(vid){
    return (dispatch, getState) => {
        let data = {
            text: getState().question.newQuestion
        }

        dispatch(createQuestionRequest());

        return request['post'](`/question/${vid}`, data)
        .then(() => {
            dispatch(createQuestionSuccess());
            return dispatch(fecthQuestions(vid));
        })
        .catch(()=>{
            //TODO
            return dispatch(fecthQuestions(vid));
        });
    }
}

export function fecthQuestions(vid){
    return {
        type: types.GET_QUESTIONS,
        promise: request['get'](`/question/${vid}`)
    }
}

export function thumbsUpSuccess(qid){
    return {
        type: types.QUESTION_THUMBSUP,
        qid
    }
}

export function thumbsUp(vid, qid, up){
    return (dispatch, getState) => {
        return request['put'](`/question/${vid}/${qid}`, {thumbsUp: up})
        .then(res => {
            if(res.status == 200){
                dispatch(thumbsUpSuccess(qid));
            }
            return dispatch(fecthQuestions(vid));
        })
        .catch(()=>{
            //TODO
            return dispatch(fecthQuestions(vid));
        });
    }
}
