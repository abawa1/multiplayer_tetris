import {combineReducers} from 'redux'
import gameReducer from './game-reducer.js'

const reducers=combineReducers({
    game: gameReducer
});

export default reducers;