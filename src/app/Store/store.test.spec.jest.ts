import 'jest';
import configureStore from 'redux-mock-store';
import {Add_LOG, addLogAction, LOG_FEATURE} from './actions/log.actions';
import {LogEntity} from '../model/logEntity';
import {logReducer} from './reducers/log.reducer';
import {INITIAL_APP_STATE, INITIAL_STATE} from './main.state';
import {outpostMiddleware} from './middleware/feature/outpostLogger';
import {addOutpostAction, OUTPOST_FEATURE} from './actions/outpost.actions';
import {Outpost} from '../model/outpost';
import {apiMiddleware} from './middleware/core/api'; // ES6 modules
import 'isomorphic-fetch';
import {apiError, apiRequest, apiSuccess} from './actions/api.actions';
import {promise} from 'selenium-webdriver';


describe('OutpostAddComponent', () => {

  beforeEach(() => {
  });

  beforeEach(() => {
  });

  const middlewares = [];
  const mockStore = configureStore(middlewares);

  const middlewares2 = [outpostMiddleware, apiMiddleware];
  const mockStore2 = configureStore(middlewares2);

  const delay = async ms => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return 1;
  };

  describe('#008 - API MIDDLEWARE - middleware itself using MOCKs', () => {
    const apiMiddlewareCreate = () => {
      const next = jest.fn();
      const store = {
        getState: jest.fn(() => ({outposts: INITIAL_APP_STATE, logs: INITIAL_STATE})),
        dispatch: jest.fn(),
      };
​
      const invoke = (action) => apiMiddleware(store)(next)(action);
      return {store, next, invoke};
    };

    it('#009 - API MIDDLEWARE CHECK - checking the middleware itself - apiError', async () => {
      // Dispatch the action
      const outpost: Outpost = {
        id: 1,
        name: 'OutpostTestName',
        location: 'TelAviv',
        supplyMeter: 269,
        logNumber: 1
      };

      const {store, next, invoke} = apiMiddlewareCreate();
      const action = apiRequest(null, 'GET', 'https://jsonplaceholder2.typicode.com/posts/a', OUTPOST_FEATURE, outpost);

      await invoke(action).then(() => {
        expect(next).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toBeCalledWith(
          expect.objectContaining(apiError(expect.any(Object), OUTPOST_FEATURE, action.data)),
        );
      });
    });

    it('#008 - API MIDDLEWARE CHECK - checking the middleware itself', () => {
      // Dispatch the action
      const outpost: Outpost = {
        id: 1,
        name: 'OutpostTestName',
        location: 'TelAviv',
        supplyMeter: 269,
        logNumber: 1
      };

      const {store, next, invoke} = apiMiddlewareCreate();
      const action = apiRequest(null, 'GET', 'https://jsonplaceholder.typicode.com/posts/1', OUTPOST_FEATURE, outpost);

      // ******** Returning a promise
      return invoke(action).then(() => {
        expect(next).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const response = {
          body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum' +
          '\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          id: 1,
          title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          userId: 1
        };
        expect(store.dispatch).toHaveBeenCalledWith(apiSuccess(response, OUTPOST_FEATURE, action.data));
      });
    });
  });


  describe('#007 - MIDDLEWARE - full scenario', () => {
    const store = mockStore2({outposts: INITIAL_APP_STATE, logs: INITIAL_STATE});

    beforeEach(() => {
      // Dispatch the action
      const outpost: Outpost = {
        id: 1,
        name: 'OutpostTestName',
        location: 'TelAviv',
        supplyMeter: 269,
        logNumber: 1
      };

      store.dispatch(addOutpostAction(outpost));
    });

    it('#007 - MIDDLEWARE CHECK - checking full - adding outpost will trigger 4 actions', async () => {
      await delay(2000);
      const actions = store.getActions();
      actions.forEach((action) => console.log('store.test.spec.jest - #006 - action ', action));
      expect(actions.length).toEqual(4);
      expect(actions).toMatchSnapshot();
    });
  });


  describe('#006 - MIDDLEWARE - middleware itself using MOCKs', () => {
    const outpostMiddlewareCreate = () => {
      const next = jest.fn();
      const store = {
        getState: jest.fn(() => ({outposts: INITIAL_APP_STATE, logs: INITIAL_STATE})),
        dispatch: jest.fn(),
      };
​
      const invoke = (action) => outpostMiddleware(store)(next)(action);
      return {store, next, invoke};
    };

    it('#006 - MIDDLEWARE CHECK - checking the middleware itself', () => {
      // Dispatch the action
      const outpost: Outpost = {
        id: 1,
        name: 'OutpostTestName',
        location: 'TelAviv',
        supplyMeter: 269,
        logNumber: 1
      };

      const {next, invoke} = outpostMiddlewareCreate();
      const action = addOutpostAction(outpost);
      invoke(action);
      expect(next).toHaveBeenCalledTimes(2);
      expect(next).toHaveBeenCalledWith(action);
      expect(next).toHaveBeenCalledWith(apiRequest(null, 'GET', 'https://jsonplaceholder.typicode.com/posts/1', OUTPOST_FEATURE, outpost));
    });
  });

  it('#005 - MIDDLEWARE CHECK - adding outpost will trigger 2 actions', () => {
    const store = mockStore2({outposts: INITIAL_APP_STATE});

    // Dispatch the action
    const outpost: Outpost = {
      id: 1,
      name: 'OutpostTestName',
      location: 'TelAviv',
      supplyMeter: 269,
      logNumber: 1
    };

    store.dispatch(addOutpostAction(outpost));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    // const expectedPayload = {type: '[LOGS] ADD', payload: logEntity, meta: {feature: '[LOGS]'}};
    // actions.forEach((action) => console.log('store.test.spec.jest - #005 - action ', action));
    expect(actions.length).toEqual(2);
  });

  it('#004.1 - REDUCER CHECK - SNAPSHOT - using bad LogEntity ', () => {
    const logEntity = {
      type: Add_LOG,
      meta: {
        feature: LOG_FEATURE,
      },
    };
    const expected = {
      logsArray: [logEntity]
    };

    expect(logReducer(undefined, logEntity)).toMatchSnapshot();
  });

  it('#004 - REDUCER CHECK - SNAPSHOT - should return state with first log ', () => {
    const logEntity: LogEntity = {
      id: 1,
      content: 'testContent2',
      calculated: 'testCalculated'
    };
    const expected = {
      logsArray: [logEntity]
    };

    expect(logReducer(undefined, addLogAction(logEntity))).toMatchSnapshot();
  });

  it('#003 - REDUCER CHECK - should return state with first log', () => {
    const logEntity: LogEntity = {
      id: 1,
      content: 'testContent',
      calculated: 'testCalculated'
    };
    const expected = {
      logsArray: [logEntity]
    };

    expect(logReducer(undefined, addLogAction(logEntity))).toEqual(expected);
  });

  it('#002 - REDUCER CHECK - should return initial state', () => {
    expect(logReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('#001 - ACTION CHECK - should dispatch action', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);

    // Dispatch the action
    const logEntity: LogEntity = {
      id: 1,
      content: 'testContent',
      calculated: 'testCalculated'
    };

    store.dispatch(addLogAction(logEntity));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {type: '[LOGS] ADD', payload: logEntity, meta: {feature: '[LOGS]'}};
    expect(actions).toEqual([expectedPayload]);
  });

  it('#000 - ACTION CHECK - checking action creation', () => {

    const logEntity: LogEntity = {
      id: 1,
      content: 'testContent',
      calculated: 'testCalculated'
    };

    const expectedAction = {type: '[LOGS] ADD', payload: logEntity, meta: {feature: '[LOGS]'}};
    expect(addLogAction(logEntity)).toEqual(expectedAction);
  });


})
;

