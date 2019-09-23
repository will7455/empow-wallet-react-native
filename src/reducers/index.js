import {appReducer} from './appReducer'
import {combineReducers} from 'redux'

export default combineReducers ({
    app: appReducer,
});