import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'

const initialState = {
  list: [],
}

const LOAD_POST = 'LOAD_POST'

const loadPost = createAction(LOAD_POST, () => ({}))

export default handleActions(
  {
    [LOAD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
)

const postCreators = {
  loadPost,
}

export { postCreators }
