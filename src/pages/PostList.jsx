import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import LeftPost from '../components/LeftPost'
import Post from '../components/Post'
import RightPost from '../components/RightPost'
import Grid from '../elements/Grid'
import { history } from '../redux/configureStore'
import { postCreators } from '../redux/modules/post'
import InfinityScroll from '../shared/InfinityScroll'

const PostList = (props) => {
  const dispatch = useDispatch()
  const post_list = useSelector((state) => state.post.list)
  const paging = useSelector((state) => state.post.paging)

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postCreators.getPostFB())
    }
  }, [])

  return (
    <>
      <Grid>
        <InfinityScroll
          callNext={() => {
            dispatch(postCreators.getPostFB(paging.next))
          }}
          is_next={paging.next ? true : false}
        >
          {post_list.map((el, i) => {
            if (el.direction === 'middle') {
              return <Post key={i} {...el} />
            } else if (el.direction === 'right') {
              return <RightPost key={i} {...el} />
            } else if (el.direction === 'left') {
              return <LeftPost key={i} {...el} />
            }
          })}
        </InfinityScroll>
      </Grid>
    </>
  )
}

export default PostList
