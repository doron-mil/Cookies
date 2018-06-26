import {
  ADD_LOTS_OF_OUTPOSTS,
  ADD_OUTPOST,
  addOutpostsBulkAction,
  OUTPOST_FEATURE,
  OUTPOST_MASS_FEATURE
} from '../../actions/outpost.actions';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api.actions';
import {addLogAction} from '../../actions/log.actions';
import {Outpost} from '../../../model/outpost';

const API_TEST_URL = 'https://jsonplaceholder.typicode.com/posts/';
const API_TEST_PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos/';

interface PhotoInterface {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

let nextLogId: number = 1;

const getPayloadForAction = (name: string, title: string) => {
  title = title.slice(0, 30);
  const newID = nextLogId++;
  const logMsg = 'Added new outpost id = ' + newID + ', name = ' + name;
  const new_payload = {
    id: newID,
    content: logMsg,
    calculated: title,
  };
  return new_payload;
};


export const outpostMiddleware = ({getState, dispatch}) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case ADD_OUTPOST:
      const outpost = action.payload;
      outpost.id = getState().outposts.outpostList.length;
      const url = API_TEST_URL + ((outpost.id % 100) + 1);
      next(apiRequest(null, 'GET', url, OUTPOST_FEATURE, outpost));
      break;

    case `${OUTPOST_FEATURE} ${API_SUCCESS}`:

      // console.log('3333333333', action);
      const payload = getPayloadForAction(action.data.name, action.payload.title);

      next(addLogAction(payload));

      break;

    case `${OUTPOST_FEATURE} ${API_ERROR}`:
      console.log('Failed the API');

      const err_payload = getPayloadForAction(action.data.name, 'NO CONNECTION');

      next(addLogAction(err_payload));

      break;


    case ADD_LOTS_OF_OUTPOSTS:
      next(apiRequest(null, 'GET', API_TEST_PHOTOS_URL, OUTPOST_MASS_FEATURE, null));
      break;

    case `${OUTPOST_MASS_FEATURE} ${API_SUCCESS}`:

      const photoesArray: Array<PhotoInterface> = action.payload;
      const outpostArray: Array<Outpost> = [];

      // console.log('aaaaaaaaaaa', photoesArray.length , getState().logs.logsArray );
      let counter = getState().outposts.outpostList.length;
      // console.log('bbbbbbbbbbbbbbb',counter );

      photoesArray.forEach((photo: PhotoInterface) => {
        const newOutpost = new Outpost();
        newOutpost.id = counter++;
        newOutpost.name = photo.title;
        newOutpost.location = photo.url + ' --- ' + photo.thumbnailUrl;
        newOutpost.supplyMeter = Math.floor(Math.random() * 101);
        newOutpost.logNumber = Math.floor(Math.random() * 501);

        outpostArray.push(newOutpost);
      });

      next(addOutpostsBulkAction(outpostArray));
      // dispatch(addLogsBulkAction(outpostArray));

      break;

    case `${OUTPOST_MASS_FEATURE} ${API_ERROR}`:
      console.log('Failed the API', action);
      break;

  }
};

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
