import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { firestore } from '../../shared/firebase'

const initialState = {
  user_id: '',
  posts: [],
}
const SET_POST = 'SET_POST'

const setPosts = createAction(SET_POST, (post, user_id) => ({ post, user_id }))

const addPostFB = (user_id, post_id) => {
  return function (dispatch, getState, { history }) {
    const likeFB = firestore.collection('like')
    const docRef = likeFB.doc(user_id)

    docRef.get().then((doc) => {
      if (doc.data()) {
        let temp = [...doc.data().posts, post_id]
        docRef.update({
          posts: temp,
        })
        dispatch(setPosts(temp, user_id))
      } else {
        likeFB.doc(user_id).set({ posts: [post_id] })
        dispatch(setPosts(post_id, user_id))
      }
    })
  }
}

const deletePostFB = (user_id, post_id) => {
  return function (dispatch, getState, { history }) {
    const likeFB = firestore.collection('like')
    const docRef = likeFB.doc(user_id)

    docRef.get().then((doc) => {
      let _temp = doc.data().posts.filter((el) => el !== post_id)
      docRef.update({
        posts: _temp,
      })
      dispatch(setPosts(_temp, user_id))
    })
  }
}

const loadLikesFB = (user_id) => {
  return function (dispatch, getState, { history }) {
    const likeFB = firestore.collection('like')
    const docRef = likeFB.doc(user_id)
    docRef.get().then((doc) => {
      if (doc.data()) {
        const posts = doc.data().posts
        dispatch(setPosts(posts, user_id))
      }
    })
  }
}

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        const newArr = action.payload.post.filter(
          (item, index) => action.payload.post.indexOf(item) === index
        )
        draft.user_id = action.payload.user_id
        draft.posts = newArr
      }),
  },
  initialState
)

const likeCreators = {
  addPostFB,
  deletePostFB,
  loadLikesFB,
}

export { likeCreators }
