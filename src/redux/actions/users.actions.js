import * as types from "../constants/users.constants";
import api from '../../apiService'

const register = (avatarUrl, name, email, password) => async(dispatch) => {
    dispatch({type: types.REGISTER_REQUEST})
    try {
        const response = await api.post('/users', {
            avatarUrl,
            name,
            email
        })
        if(response.success === true) {
            dispatch({type: types.REGISTER_SUCCESS, payload: response.data})
        }

    } catch(error) {
        dispatch({type: types.REGISTER_FAILURE, payload: error.message})
    }
}

const userActions = {
    register,
}

export default userActions