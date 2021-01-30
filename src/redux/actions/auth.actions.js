import * as types from "../constants/auth.constants";
import api from '../../apiService'

const login = (email, password) => async (dispatch) => {
    dispatch({type: types.LOGIN_REQUEST})
    try {
    const response = await api.post('/auth/login', {
        email,
        password
    })
    if(response.data.success === true) {
        dispatch({type: types.LOGIN_SUCCESS, payload: response.data.data.accessToken})
    };
    } catch(error) {
        dispatch({type: types.LOGIN_FAILURE, payload: error.message})
    }
    
}


const authActions ={
    login,
}

export default authActions