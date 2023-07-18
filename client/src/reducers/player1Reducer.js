import {defaultGameState} from '../utils'
const player1Reducer=(state=defaultGameState(),action)=>{
    switch(action.type){
        case 'UPDATE_PLAYER1_STATE':
            return action.payload
        default:
            return state;
    }
}
export default player1Reducer;