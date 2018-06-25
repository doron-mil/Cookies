import {ADD_OUTPOST, OUTPOST_FEATURE} from '../../actions/outpost.actions';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api.actions';
import {addLogAction} from '../../actions/log.actions';

const API_TEST_URL = 'https://jsonplaceholder.typicode.com/posts/';

let nextLogId: number = 1;

export const outpostMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case ADD_OUTPOST:
      const url = API_TEST_URL + action.payload.name
      next(apiRequest(null, 'GET', url , OUTPOST_FEATURE, action.payload));
      break;

    case `${OUTPOST_FEATURE} ${API_SUCCESS}`:

      // console.log( '22222222222' , action );
      let titleText = action.payload.title;
      if (titleText) {
        titleText = titleText.slice(0, 30);
      }
      const newID = nextLogId++;
      const logMsg = 'Added new outpost id = ' + newID + ', name = ' + action.data.name;
      const payload = {
        id: newID,
        content: logMsg,
        calculated: titleText,
      };
      next(addLogAction(payload));

      break;

    case `${OUTPOST_FEATURE} ${API_ERROR}`:
      // TODO
      console.error('Failed the API');
      break;
  }
};

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
