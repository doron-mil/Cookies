import {Outpost} from '../../model/outpost';

export const OUTPOST_FEATURE = '[OUTPOST]';

// define action types
export const ADD_OUTPOST = `${OUTPOST_FEATURE} ADD`;

export const addOutpostAction = (outpost: Outpost) => ({
  type: ADD_OUTPOST,
  payload: outpost,
  meta: { feature: OUTPOST_FEATURE}
});

