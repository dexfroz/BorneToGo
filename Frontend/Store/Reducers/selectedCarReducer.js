// Store/Reducers/selectedCarReducer.js

// Etat initial : pas de voiture sélectionnée
const initialState = { car: null }

function reducerCarSelected(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CAR_PICKED_BY_USER':
            // On stock la voiture validé par le user 
            nextState = { car: action.value }
            return nextState || state
        default:
            return state
    }
}

export default reducerCarSelected