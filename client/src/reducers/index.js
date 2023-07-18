import {combineReducers} from 'redux'
import gameReducer from './game-reducer.js'
import player1Reducer from './player1Reducer.js';
import player2Reducer from './player2Reducer.js';
const reducers=combineReducers({
    game: gameReducer
});
export const multiplayerReducer=combineReducers({
    player1:player1Reducer,
    player2:player2Reducer
})
export default reducers;