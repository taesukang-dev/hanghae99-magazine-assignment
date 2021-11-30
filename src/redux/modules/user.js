import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'

import { auth } from '../../shared/firebase'
import firebase from 'firebase/app'

const initialState = {
  is_login: false,
  user: '',
}

const SET_USER = 'SET_USER'
const SIGN_OUT = 'SIGN_OUT'

const setUser = createAction(SET_USER, (user) => ({ user }))
const signout = createAction(SIGN_OUT, () => ({}))

// middleware actions
const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth.createUserWithEmailAndPassword(id, pwd).then((user) => {
      auth.currentUser
        .updateProfile({ displayName: user_name })
        .then(() => {
          dispatch(
            setUser({
              user_name: user_name,
              id: id,
              user_profile: '',
              uid: user.user.uid,
            })
          )
          history.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
        .catch((err) => {
          let errCode = err.code
          let errMessage = err.message
          console.log(errCode, errMessage)
        })
    })
  }
}

const signinFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: '',
              uid: user.user.uid,
            })
          )
          history.push('/')
        })
        .catch((err) => {
          let errorCode = err.code
          let errorMessage = err.message

          console.log(errorCode, errorMessage)
        })
    })
  }
}

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: '',
            id: user.email,
            uid: user.uid,
          })
        )
      } else {
        dispatch(signout())
      }
    })
  }
}

const signoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(signout())
      history.replace('/')
    })
  }
}

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [SIGN_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null
        draft.is_login = false
      }),
  },
  initialState
)

const userCreators = {
  setUser,
  signupFB,
  signinFB,
  signoutFB,
  loginCheckFB,
}

export { userCreators }
