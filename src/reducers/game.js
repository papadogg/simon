import * as ACTION from "../const/actions";

const initialState = {
  difficulty: 1000,
  gameStarted: false,
  active: null,
  playerSeq: [],
  playerTurn: true
};

const setStart = (state, action) => {
  const _state = {
    ...state,
    gameStarted: action.payload,
    acitve: null,
    playerSeq: [],
    playerTurn: false
  };
  return _state;
};

const onStop = (state, action) => {
  return {
    ...state,
    gameStarted: false,
    active: null,
    playerSeq: [],
    playerTurn: true
  };
};

const setActive = (state, action) => {
  const _state = {
    ...state,
    active: action.payload
  };
  return _state;
};

const setDifficulty = (state, action) => {
  const _state = {
    ...state,
    difficulty: action.payload
  };
  return _state;
};

const setPlayerTurn = (state, action) => {
  const _state = {
    ...state,
    playerTurn: action.payload
  };
  return _state;
};

const setPlayerSeq = (state, action) => {
  const _state = {
    ...state,
    playerSeq: action.payload ? state.playerSeq.concat(action.payload) : []
  };
  return _state;
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.START:
      return setStart(state, action);
    case ACTION.STOP:
      return onStop(state, action);
    case ACTION.ACTIVE:
      return setActive(state, action);
    case ACTION.SET_DIFFICULTY:
      return setDifficulty(state, action);
    case ACTION.SET_PLAYER_TURN:
      return setPlayerTurn(state, action);
    case ACTION.PLAYER_SEQUENCE:
      return setPlayerSeq(state, action);
    default:
      return state;
  }
};

export default game;
