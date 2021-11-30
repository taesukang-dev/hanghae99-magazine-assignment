import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Post from '../components/Post'
import { postCreators } from '../redux/modules/post'

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const id = props.match.params.id
  const post_list = useSelector((state) => state.post.list)

  const post = post_list.find((e) => e.id === id)

  useEffect(() => {
    if (post) {
      return
    }

    dispatch(postCreators.getOnePostFB(id))
  }, [])

  return <>{post && <Post {...post} />}</>
}

export default PostDetail
