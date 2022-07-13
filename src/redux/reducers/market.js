import { MARKET_ACTIONS } from "../../constants/actions/market";

export const defaultState = {
  saleType: "market", // market, auction, reverse-auction
};

const market = (state = defaultState, action) => {
  switch (action.type) {
    case MARKET_ACTIONS.CHANGE_SALE_TYPE:
      const { saleType } = action.payload;
      return { ...state, saleType };
    default:
      return state;
  }
};

export default market;
