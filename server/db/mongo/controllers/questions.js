import Question from '../models/questions';
import passport from 'passport';
import md5 from 'spark-md5';

export function all(req, res) {

    Question.find({vid:req.params.vid}).exec((err, topics) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }
        return res.json(topics);
    });
}

export function add(req, res) {
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
    Question.create(data, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }
        return res.status(200).send('OK');
    });
}

export function update(req, res){
    const { user, params, body : { thumbsUp : isIncrement } } = req;
    const query = {
        id: params.qid,
        vid: params.vid
    }

    Question.findOne(query, (err, question) => {
        if (err) {
            console.log('Error on query!');
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
                    console.log('Error on save!');
                    return res.status(500).send('We failed to save for some reason');
                }
                return res.status(200).send('Updated successfully');
            })
        }else{
            return res.status(406).send('Denied');
        }

    });
}

export default {
    all,
    add,
    update
}
