import {API_REQUEST, apiError, apiSuccess} from '../../actions/api.actions';

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const {body, url, method, feature} = action.meta;
    const {data} = action.data;

    fetch(url, {body, method})
      .then(response => response.json())
      .then(response => {
        // console.log('aaaaaaaaaaaa', response);
        dispatch(apiSuccess(response, feature, data));
      })
      .catch(error => dispatch(apiError(error, feature, data)));
  }
};

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
