import { createStore, combineReducers } from 'redux'
import reducerBorneActive from './Reducers/activeBorneReducer'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    form: formReducer,
    borneActive: reducerBorneActive,
});

export default createStore(rootReducer)