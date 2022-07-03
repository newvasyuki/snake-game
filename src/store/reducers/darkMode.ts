import { DARK_MODE } from '../actionTypes';

const initialState = {
  isDarkMode: false,
};

type ThemeToggleAction = {
  type: string;
  payload: { isDarkMode: boolean };
};

const darkModeReducer = (state = initialState, action: ThemeToggleAction) => {
  const { type, payload } = action;
  switch (type) {
    case DARK_MODE:
      return {
        ...state,
        isDarkMode: payload.isDarkMode,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
