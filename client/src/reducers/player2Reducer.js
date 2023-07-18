import {defaultGameState} from '../utils'
const player2Reducer=(state=defaultGameState(),action)=>{
    switch(action.type){
        case 'UPDATE_PLAYER2_STATE':
            return action.payload
        default:
            return state;
    }
}
export default player2Reducer;