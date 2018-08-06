import { introService } from 'services';
import * as types from 'types';
import axios from 'axios';

const fetchData = (params, store) => {
  return introService.getVideosData()
  .then(res => {
      store.dispatch({
          type: types.INTRO_PAST,
          data: res.data.items
      });
      return "";
  });
};

export default fetchData;
