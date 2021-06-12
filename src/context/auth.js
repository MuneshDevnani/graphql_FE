import React, {useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState ={
    user: null
}

if(localStorage.getItem("authToken")){
 const decodedToken = jwtDecode(localStorage.getItem('authToken'));

 if(decodedToken.exp * 1000 < Date.now()){
     localStorage.removeItem("authToken")
 } else{
     initialState.user =decodedToken;
 }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
            default:
                return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem("authToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout(){
        localStorage.removeItem("authToken")
        dispatch({type: 'LOGOUT'});
    }

    return(
        <AuthContext.Provider
          value={{user: state.user, login, logout}}
          {...props}
          />
    )
}

export {AuthContext, AuthProvider}