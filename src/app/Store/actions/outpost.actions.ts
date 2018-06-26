import {Outpost} from '../../model/outpost';

export const OUTPOST_FEATURE = '[OUTPOST]';
export const OUTPOST_MASS_FEATURE = '[OUTPOST-MASS]';

// define action types
export const ADD_OUTPOST = `${OUTPOST_FEATURE} ADD`;
export const ADD_LOTS_OF_OUTPOSTS = `${OUTPOST_MASS_FEATURE} ADD_LOTS`;
export const ADD_OUTPOSTS_BULK = `${OUTPOST_MASS_FEATURE} ADD_BULK`;

export const addOutpostAction = (outpost: Outpost) => ({
  type: ADD_OUTPOST,
  payload: outpost,
  meta: { feature: OUTPOST_FEATURE}
});

export const addLotsOfOutpostsAction = () => ({
  type: ADD_LOTS_OF_OUTPOSTS,
  meta: { feature: OUTPOST_MASS_FEATURE}
});

export const addOutpostsBulkAction = (outpostArray: Outpost[]) => ({
  type: ADD_OUTPOSTS_BULK,
  payload: outpostArray,
  meta: { feature: OUTPOST_FEATURE}
});

