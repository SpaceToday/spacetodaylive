import {validateVideoID} from 'youtube-validate'

export function exist(req, res){
    validateVideoID(req.params.id)
    .then(validateRes => {
        return res.status(200).send(true);
    })
    .catch(e =>{
        return res.status(400).send(false);
    })
}

export default {
    exist
};
