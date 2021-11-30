import produce from 'immer'
import moment from 'moment'
import { createAction, handleActions } from 'redux-actions'
import { firestore, storage } from '../../shared/firebase'
import { imageCreators } from './image'

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
}

// const initialPost = {
//   user_id, getState -> user store
//   user_profile, getState -> user store
//   user_name, getState -> user store
//   contents, textArea value
//   image, getState -> image store
//   insert_dt, moment
//   like_cnt
// }

const LOAD_POST = 'LOAD_POST'
const UPLOAD_POST = 'UPLOAD_POST'

const loadPost = createAction(LOAD_POST, (post_list, paging) => ({
  post_list,
  paging,
}))
const uploadPost = createAction(UPLOAD_POST, (post) => ({ post }))

// middlewares
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging

    if (_paging.start && !_paging.next) {
      return
    }

    const postDB = firestore.collection('post')

    let query = postDB.orderBy('insert_dt', 'desc')

    if (start) {
      query = query.startAt(start)
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = []
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        }

        docs.forEach((doc) => {
          let _post = doc.data()
          post_list.push({ ..._post, id: doc.id })
        })

        post_list.pop()

        dispatch(loadPost(post_list, paging))
      })
  }
}

const uploadPostFB = (post) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')
    const _user = getState().user.user

    const _post = {
      user_name: _user.user_name,
      user_id: _user.uid,
      contents: post.contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
      like_cnt: 0,
      direction: post.direction,
    }

    const _image = getState().image.preview
    const _upload = storage
      .ref(`images/${_post.user_id}_${new Date().getTime()}`)
      .putString(_image, 'data_url')

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url
        })
        .then((url) => {
          postDB
            .add({ ..._post, image_url: url })
            .then((doc) => {
              let post = { id: doc.id, ..._post, image_url: url }
              dispatch(uploadPost(post))
              history.push('/')
              dispatch(imageCreators.setPreview(''))
            })
            .catch((err) => {
              window.alert('포스트 작성 실패')
            })
        })
        .catch((err) => {
          window.alert('이미지 업로드 실패')
        })
    })
  }
}

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')

    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data())
        dispatch(loadPost([{ id: doc.id, ...doc.data() }]))
      })
  }
}

const modifyFB = (post) => {
  return function (dispatch, getState, { history }) {
    if (getState().image.preview === '') {
      const postDB = firestore.collection('post')
      const docRef = postDB.doc(post.id)
      docRef.update({
        like_cnt: 1,
        contents: post.contents,
      })
    } else {
      const postDB = firestore.collection('post')
      const docRef = postDB.doc(post.id)

      const _image = getState().image.preview
      const _upload = storage
        .ref(`images/${post.user_id}_${new Date().getTime()}`)
        .putString(_image, 'data_url')

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url
          })
          .then((url) => {
            docRef
              .update({
                like_cnt: 1,
                contents: post.contents,
                image_url: url,
              })
              .then(() => {
                history.replace(`/detail/${post.id}`)
                window.location.reload()
              })
          })
          .catch((err) => {
            window.alert('이미지 업로드 실패')
          })
      })
    }
  }
}

const plusLikeCntFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')
    const docRef = postDB.doc(id)
    docRef.get().then((doc) => {
      docRef.update({
        like_cnt: doc.data().like_cnt + 1,
      })
    })
  }
}

const minusLikeCntFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')
    const docRef = postDB.doc(id)
    docRef.get().then((doc) => {
      docRef.update({
        like_cnt: doc.data().like_cnt - 1,
      })
    })
  }
}

export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur]
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur
            return acc
          }
        }, [])
        if (action.payload.paging) {
          draft.paging = action.payload.paging
        }
      }),
    [UPLOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post)
        draft.list.unshift(action.payload.post)
      }),
  },
  initialState
)

const postCreators = {
  loadPost,
  getPostFB,
  uploadPostFB,
  getOnePostFB,
  modifyFB,
  plusLikeCntFB,
  minusLikeCntFB,
}

export { postCreators }
