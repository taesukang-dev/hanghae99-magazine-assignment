import { Button, Grid, Image, Text } from '../elements'

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid side_flex padding="16px">
          <Grid side_flex width="auto">
            <Image size="50" circle />
            <Text bold margin="0px 0px 0px 10px">
              me
            </Text>
          </Grid>

          <Grid side_flex width="auto">
            <Text margin="0px 10px 0px 0px">17시간 전</Text>
            <Button padding="10px">수정</Button>
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text>매드맥스좌 ㅋㅋ</Text>
        </Grid>
        <Grid>
          <Image size="300" rectangle></Image>
        </Grid>

        <Grid side_flex padding="16px">
          <Grid width="auto">
            <Text bold>좋아요 10 개</Text>
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
