// Store/Reducers/selectedCarReducer.js

// Etat initial : pas de borne sélectionnée
const initialState = { car: null }

function reducerCarSelected(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CAR_PICKED_BY_USER':
            // On met active à l'id de la station courante 
            console.log("State : ", state, "action : ", action)
            nextState = { car: action.value }
            return nextState || state
        default:
            return state
    }
}

export default reducerCarSelected