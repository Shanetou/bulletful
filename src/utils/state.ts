type state = {
  isInitialized: boolean;
};

type partialState = Partial<state>;

const initialState: state = {
  isInitialized: false,
};

let state: state = initialState;

export const getState = (): state => state;

export const setState = (nextState: partialState): void => {
  state = {
    ...state,
    ...nextState,
  };
};
