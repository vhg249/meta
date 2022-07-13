import { LAND_ACTIONS } from "../../constants/actions/land";

export const defaultState = {
  name: ''
};

const land = (state = defaultState, action) => {
  switch (action.type) {
    case LAND_ACTIONS.CHANGE_LAND:
      const { name } = action.payload;
      return { ...state, name };
    default:
      return state;
  }
};

export default land;
