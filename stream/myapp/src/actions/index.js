import requestStream from '../api/stream';
import history from '../components/history';

export const signIn = (userId) => {
    return {type: 'SIGN_IN', payload: userId }
}
export const signOut = () => {
    return {type: 'SIGN_OUT'}
}

export const createStream = formValue => async (dispatch, getState) => {
    
   const response = await requestStream.post('/streams', {...formValue, userId:getState().auth.userId});
   dispatch({type:'CREATE_STREAM', payload:response.data});
    history.push('/');
}

export const fetchStreams = () => async dispatch => {
    const response = await requestStream.get('/streams');
    dispatch({type:'FETCH_STREAMS', payload:response.data});
}

export const fetchStream = id => async dispatch => {
    const response = await requestStream.get(`/streams/${id}`);
    dispatch({type:'FETCH_STREAM', payload:response.data});
}

export const editStream = (id, formValue) => async dispatch => {
    const response = await requestStream.patch(`/streams/${id}`, formValue)
    dispatch({type:'EDIT_STREAM', payload:response.data});
    history.push('/');
}