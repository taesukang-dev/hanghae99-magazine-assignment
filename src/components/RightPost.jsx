import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, Grid, Image, Text } from '../elements'
import { history } from '../redux/configureStore'
import { likeCreators } from '../redux/modules/like'
import { postCreators } from '../redux/modules/post'

const RightPost = (props) => {
  const dispatch = useDispatch()
  const user_id = useSelector((state) => state.user.user?.uid)

  const likes = useSelector((state) => state.like.posts)

  const like_one = likes.find((el) => el === props.id)

  const [heart, setHeart] = useState(false)
  const { _onClick } = props
  return (
    <>
      <Grid _onClick={_onClick}>
        <Grid side_flex padding="16px">
          <Grid side_flex width="auto">
            <Image
              size="50"
              circle
              src={props.image_url ? props.image_url : ''}
            />
            <Text bold margin="0px 0px 0px 10px">
              {props.user_name}
            </Text>
          </Grid>

          <Grid side_flex width="auto">
            <Text margin="0px 10px 0px 0px">{props.insert_dt}</Text>
            {props.user_id === user_id && (
              <Button
                padding="10px"
                _onClick={() => {
                  history.push(`/modify/${props.id}`)
                }}
              >
                수정
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid padding="16px" side_flex>
          <Text>{props.contents}</Text>
          <Grid
            _onClick={() => {
              history.push(`/detail/${props.id}`)
            }}
          >
            <Image
              size="300"
              src={props.image_url ? props.image_url : ''}
              rectangle
            ></Image>
          </Grid>
        </Grid>

        <Grid side_flex padding="16px">
          <Grid width="auto">
            <Text bold>좋아요 {props.like_cnt} 개</Text>
          </Grid>

          {like_one ? (
            <Grid
              width="auto"
              pointer
              _onClick={() => {
                setHeart(false)
                dispatch(postCreators.minusLikeCntFB(props.id))
                dispatch(likeCreators.deletePostFB(user_id, props.id))
              }}
            >
              <Text fontSize="30px">🧡</Text>
            </Grid>
          ) : (
            <Grid
              width="auto"
              pointer
              _onClick={() => {
                setHeart(true)
                dispatch(postCreators.plusLikeCntFB(props.id))
                dispatch(likeCreators.addPostFB(user_id, props.id))
              }}
            >
              <Text fontSize="30px">🤍</Text>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default RightPost
