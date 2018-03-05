import store from "../store";
import {
  setStart,
  setActive,
  stopGame,
  setPlayerSequence,
  setPlayerTurn
} from "../actions";

import do_sound from "../sounds/do_sound.wav";
import re_sound from "../sounds/re_sound.wav";
import mi_sound from "../sounds/mi_sound.wav";
import fa_sound from "../sounds/fa_sound.wav";
import error_sound from "../sounds/error_sound.wav";
import tada from "../sounds/tada.wav";

let timer1 = null;
let timer2 = null;
let round = 1;
let currentSeq;
let sequence;
let gameOver = true;
let playingSound = false;
let playerTurn;

const sound1 = new Audio(do_sound);
const sound2 = new Audio(re_sound);
const sound3 = new Audio(mi_sound);
const sound4 = new Audio(fa_sound);
const sound_error = new Audio(error_sound);
const sound_win = new Audio(tada);

const sounds = [sound1, sound2, sound3, sound4];

store.subscribe(() => {
  const { gameStarted, active, playerSeq, difficulty } = store.getState().game;
  if (gameStarted === true) {
    sequence = init();
    play(round, sequence, difficulty, store);
    store.dispatch(setStart(false));
  }
  if (active && !playingSound) {
    playingSound = true;
    playAudio(sounds[active - 1]);
  }
  if (!active) {
    playingSound = false;
  }
  if (playerTurn && !gameOver) {
    const position = playerSeq.length;
    if (currentSeq[position - 1] !== playerSeq[position - 1]) {
      gameOver = true;
      round = 1;
      store.dispatch(stopGame());
      playAudio(sound_error);
      return;
    } else if (currentSeq.length === playerSeq.length) {
      if (playerSeq.length === 20) {
        playAudio(sound_win);
        return;
      }
      if (active === null) {
        round++;
        play(round, sequence, difficulty, store);
        playerTurn = false;
        store.dispatch(setPlayerTurn(false));
        store.dispatch(setPlayerSequence(null));
      }
    }
  }
});

function playAudio(file) {
  file.load();
  file.play();
}

function play(round, sequence, difficulty, store) {
  currentSeq = sequence.slice(0, round);
  let i = 0;
  (function playSounds() {
    timer1 = setTimeout(() => {
      store.dispatch(setActive(currentSeq[i]));
      timer2 = setTimeout(() => {
        store.dispatch(setActive(null));
      }, difficulty / 2);
      i++;
      if (i < currentSeq.length) {
        playSounds();
      } else {
        playerTurn = true;
        store.dispatch(setPlayerTurn(true));
      }
    }, difficulty);
  })();
}

function init() {
  gameOver = false;
  playerTurn = false;
  round = 1;
  clearTimeout(timer1);
  clearTimeout(timer2);
  const generateId = () => Math.floor(Math.random() * 4) + 1;
  const rounds = 20;
  const game = [];

  for (let i = 0; i < rounds; i++) {
    game.push(generateId());
  }
  return game;
}
