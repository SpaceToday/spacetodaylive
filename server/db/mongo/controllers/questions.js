import Question from '../models/questions';
import passport from 'passport';
import md5 from 'spark-md5';
import { isOwner } from '../../../youtube';

export function all(req, res) {
    try {
        Question.find({vid:req.params.vid}).exec((err, questions) => {
            if (err) {
                console.error('Error on Query All Questions', err);;
                return res.status(500).send('Something went wrong getting the data');
            }
            return res.json(questions);
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send('Something went wrong getting the data');
    }
}

export function add(req, res) {
    try {
        const id = md5.hash(`${req.body.text}${req.user.google}${req.params.vid}`);
        const data = {
            id,
            user : {
                google: req.user.google,
                profile: req.user.profile
            },
            text : req.body.text,
            vid: req.params.vid
        }
        Question.count({'user.google': req.user.google}, (err, count) => {
            if(err){
                console.error('Error on query delete', err);
                return res.status(500).send('Error on delete');
            }else if(count>=3){
                return res.status(400).send('max questions reached');
            }else{
                Question.create(data, (err) => {
                    if (err) {
                        console.error('Error on query delete', err);
                        return res.status(500).send(err);
                    }
                    return res.status(200).send('OK');
                });
            }
        })
    } catch (e) {
        console.error(e);
    }
}

export function update(req, res){
    try {
        const { user, params, body : { thumbsUp : isIncrement } } = req;
        if( !user || !user.google ){
            return res.status(406).send('User not defined');
        }

        const query = {
            id: params.qid,
            vid: params.vid
        }

        Question.findOne(query, (err, question) => {
            if (err) {
                console.error('Error on query!', err);
                return res.status(500).send('We failed to save for some reason');
            }
            const haveAlready = question.thumbsUp.some((e)=>e==user.google);

            if(isIncrement && !haveAlready || !isIncrement && haveAlready){
                if(isIncrement){
                    question.thumbsUp.push(user.google);
                }
                else {
                    question.thumbsUp = question.thumbsUp.filter(e=>e!=user.google);
                }
                question.count = question.thumbsUp.length;
                question.save((err)=>{
                    if(err){
                        console.error('Error on save!', err);
                        return res.status(500).send('We failed to save for some reason');
                    }
                    return res.status(200).send('Updated successfully');
                })
            }else{
                return res.status(406).send('Denied');
            }
        });
    } catch (e) {
        console.error(e);
    }
}

export function remove(req, res){
    try {
        const { user, params } = req;
        const query = {
            id: params.qid,
            vid: params.vid
        }
        Question.findOne(query, (err, question) => {
            if (err || !question) {
                console.error('Error on delete', err);
                return res.status(500).send('We failed to delete for some reason');
            }

            function removeQuestion(question, res){
                question.remove((err) => {
                    if (err) {
                        console.error('Error on delete', err);
                        return res.status(500).send('We failed to delete for some reason');
                    }
                    return res.status(200).send('Removed Successfully');
                })
            }

            if(question.user.google==user.google){
                return removeQuestion(question, res);
            }else{
                isOwner(params.vid, user, (isOwnerResp) => {
                    if(isOwnerResp){
                        return removeQuestion(question, res);
                    }else {
                        return res.status(406).send('Denied');
                    }
                })
            }
        });
    } catch (e) {
        console.error(e);
    }
}

export default {
    all,
    add,
    update,
    remove
}
