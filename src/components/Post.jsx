import { Button, Grid, Image, Text } from '../elements'

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid side_flex padding="16px">
          <Grid side_flex width="auto">
            <Image size="50" circle src={props.image ? props.image : ''} />
            <Text bold margin="0px 0px 0px 10px">
              {props.user_name}
            </Text>
          </Grid>

          <Grid side_flex width="auto">
            <Text margin="0px 10px 0px 0px">{props.insert_dt}</Text>
            <Button padding="10px">수정</Button>
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image
            size="300"
            src={props.image ? props.image : ''}
            rectangle
          ></Image>
        </Grid>

        <Grid side_flex padding="16px">
          <Grid width="auto">
            <Text bold>좋아요 {props.like} 개</Text>
          </Grid>
          <Grid width="auto">
            <Text>하트</Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Post
