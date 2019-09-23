import {createReducer,createAction} from 'redux-starter-kit'
export const setAllAccountInfo = createAction('setAllAccountInfo')

export const appReducer = createReducer({
    allAccountInfo: []
}, {
    [ setAllAccountInfo ]: (state, {payload}) => {
        state.allAccountInfo = payload
    }
});