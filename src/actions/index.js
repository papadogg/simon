import * as ACTIONS from "../const/actions";

export const setStart = val => {
  return {
    type: ACTIONS.START,
    payload: val
  };
};

export const stopGame = () => {
  return {
    type: ACTIONS.STOP
  };
};

export const setDifficulty = val => {
  return {
    type: ACTIONS.SET_DIFFICULTY,
    payload: val
  };
};

export const setPlayerTurn = val => {
  return {
    type: ACTIONS.SET_PLAYER_TURN,
    payload: val
  };
};

export const setActive = id => {
  return {
    type: ACTIONS.ACTIVE,
    payload: id
  };
};

export const setPlayerSequence = id => {
  return {
    type: ACTIONS.PLAYER_SEQUENCE,
    payload: id
  };
};
