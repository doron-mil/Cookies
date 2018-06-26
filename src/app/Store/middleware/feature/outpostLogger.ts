import {ADD_OUTPOST, OUTPOST_FEATURE} from '../../actions/outpost.actions';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api.actions';
import {addLogAction} from '../../actions/log.actions';
import {Outpost} from '../../../model/outpost';

const API_TEST_URL = 'https://jsonplaceholder.typicode.com/posts/';

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


export const outpostMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case ADD_OUTPOST:
      const url = API_TEST_URL + action.payload.name;
      next(apiRequest(null, 'GET', url, OUTPOST_FEATURE, action.payload));
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
  }
};

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
