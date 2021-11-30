import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'

const initialState = {
  preview: '',
  uploading: false,
}

const SET_PREVIEW = 'SET_PREVIEW'

const setPreview = createAction(SET_PREVIEW, (url) => ({ url }))

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.url
      }),
  },
  initialState
)

const imageCreators = {
  setPreview,
}

export { imageCreators }
