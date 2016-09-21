import { listChannelVideos } from '../../../youtube';

export function all(req, res) {
    //console.log("INTRO SERVER");
    listChannelVideos( (err, data) => {
        if(err) return res.status(500).send("Error on Intro fetch");
        return res.json(data);
    } )
}

export default {
    all
}
