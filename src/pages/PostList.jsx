import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Post from '../components/Post'
import Grid from '../elements/Grid'
import { postCreators } from '../redux/modules/post'

const PostList = (props) => {
  const dispatch = useDispatch()
  const post_list = useSelector((state) => state.post.list)
  useEffect(() => {
    dispatch(postCreators.getPostFB())
  }, [dispatch])

  return (
    <>
      <Grid>
        {post_list.map((el, i) => {
          return <Post key={i} {...el} />
        })}
      </Grid>
    </>
  )
}

export default PostList
