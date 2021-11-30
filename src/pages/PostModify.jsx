import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { postCreators } from '../redux/modules/post'
import PostWrite from './PostWrite'

const PostModify = (props) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const post_list = useSelector((state) => state.post.list)
  const post = post_list.find((e) => e.id === id)

  useEffect(() => {
    if (post) {
      return
    }

    dispatch(postCreators.getOnePostFB(id))
  }, [])

  return (
    <>
      <PostWrite {...post} />
    </>
  )
}

export default PostModify
