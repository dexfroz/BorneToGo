import { createStore, combineReducers } from 'redux'
import reducerBorneActive from './Reducers/activeBorneReducer'
import reducerCarSelected from './Reducers/selectedCarReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    form: formReducer,
    borneActive: reducerBorneActive,
    carSelected: reducerCarSelected,
});

export default createStore(rootReducer)