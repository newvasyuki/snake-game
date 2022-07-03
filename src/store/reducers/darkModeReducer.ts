import { DARK_MODE } from 'store/actionTypes';

const initialState = {
  isDarkMode: false,
};

type ThemeToggleAction = {
  type: string;
  payload: { isDarkMode: boolean };
};

const darkModeReducer = (state = initialState, action: ThemeToggleAction) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        // getting value from the action file and changing isdarkMode State.
        isdarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
