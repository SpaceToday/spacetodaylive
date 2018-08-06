import axios from 'axios';

const service = {
    getVideosData: () => axios.get('/intro')
};

export default service;
