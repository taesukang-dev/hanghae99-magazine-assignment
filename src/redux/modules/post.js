import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { firestore } from '../../shared/firebase'

const initialState = {
  list: [],
}

const initialPost = {}

const LOAD_POST = 'LOAD_POST'

const loadPost = createAction(LOAD_POST, (post_list) => ({ post_list }))

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')
    postDB.get().then((docs) => {
      let temp = []
      docs.forEach((doc) => {
        temp.push(doc.data())
      })
      dispatch(loadPost(temp))
    })
  }
}

export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list)
      }),
  },
  initialState
)

const postCreators = {
  loadPost,
  getPostFB,
}

export { postCreators }
