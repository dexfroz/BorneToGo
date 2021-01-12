// Store/Reducers/activeBorneReducer.js

// Etat initial : pas de borne sélectionnée
const initialState = { active: null }

function reducerBorneActive(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'BORNE_ACTIVE_MODIFIEE':
            // On met active à l'id de la station courante 
            nextState = { active: action.value.idStation }
            return nextState || state
        default:
            return state
    }
}

export default reducerBorneActive