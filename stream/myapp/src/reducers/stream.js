import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case 'CREATE_STREAM':
            return {...state, [action.payload.id]:action.payload}
        case 'FETCH_STREAMS':
            return {...state, ..._.mapKeys(action.payload,'id')}
        case 'FETCH_STREAM':
            return {...state, [action.payload.id]:action.payload}
        case 'EDIT_STREAM':
            return {...state, [action.payload.id]:action.payload}
        default:
            return state
    }
}