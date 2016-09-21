import { introService } from 'services';

const fetchData = () => {
  return introService.getVideosData()
  .then(res => res.data);
};

export default fetchData;
