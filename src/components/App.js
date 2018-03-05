import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Quarter from "./Quarter";
import {
  setStart,
  setPlayerSequence,
  setActive,
  setDifficulty
} from "../actions";

const App = ({
  active,
  gameStarted,
  difficulty,
  playerTurn,
  setStart,
  setPlayerSequence,
  setActive,
  setDifficulty
}) => {
  const startGame = () => {
    setStart(true);
  };
  const onPress = id => {
    if (!playerTurn) {
      return;
    }
    setActive(id);
    if (id) {
      setPlayerSequence(id);
    }
  };
  const onSetDifficulty = e => {
    setDifficulty(e.target.value);
  };
  return (
    <div className="game">
      <Quarter
        className="quarterCircleTopLeft"
        onPress={onPress}
        id={1}
        active={active === 1}
      />
      <Quarter
        className="quarterCircleTopRight"
        onPress={onPress}
        id={2}
        active={active === 2}
      />
      <Quarter
        className="quarterCircleBottomRight"
        onPress={onPress}
        id={3}
        active={active === 3}
      />
      <Quarter
        className="quarterCircleBottomLeft"
        onPress={onPress}
        id={4}
        active={active === 4}
      />
      <div className="middle">
        <p>simon</p>
        <div>
          <button onClick={startGame}>Start</button>
          <select value={difficulty} onChange={onSetDifficulty}>
            <option value={1500}>Easy</option>
            <option value={1000}>Medium</option>
            <option value={400}>Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  active: PropTypes.any,
  gameStarted: PropTypes.bool.isRequired,
  difficulty: PropTypes.number.isRequired,
  playerTurn: PropTypes.bool.isRequired,
  setStart: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  setPlayerSequence: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    active: state.game.active,
    gameStarted: state.game.gameStarted,
    difficulty: state.game.difficulty,
    playerTurn: state.game.playerTurn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStart: val => dispatch(setStart(val)),
    setActive: id => dispatch(setActive(id)),
    setPlayerSequence: id => dispatch(setPlayerSequence(id)),
    setDifficulty: val => dispatch(setDifficulty(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
