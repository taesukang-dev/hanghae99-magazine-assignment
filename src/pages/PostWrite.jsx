import { Button, Grid, Input, Text } from '../elements'
import FileUpload from '../shared/FileUpload'

const PostWrite = (props) => {
  return (
    <>
      <Grid padding="16px">
        <Grid>
          <Text bold fontSize="32px">
            게시글 작성
          </Text>
        </Grid>
        <Grid>
          <FileUpload />
        </Grid>

        <Grid>
          <Input
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          ></Input>
        </Grid>
        <Button width="100%" padding="20px" margin="40px 0px">
          게시글 작성
        </Button>
      </Grid>
    </>
  )
}

export default PostWrite
