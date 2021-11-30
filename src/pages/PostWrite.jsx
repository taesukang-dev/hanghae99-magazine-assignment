import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Grid, Input, Text } from '../elements'
import { postCreators } from '../redux/modules/post'
import FileUpload from '../shared/FileUpload'

const PostWrite = (props) => {
  const dispatch = useDispatch()
  const [contents, setContents] = useState('')
  const [direction, setDirection] = useState('middle')

  const upload = () => {
    dispatch(
      postCreators.uploadPostFB({
        contents: contents,
        direction,
      })
    )
  }
  const modify = () => {
    dispatch(
      postCreators.modifyFB({ id: props.id, contents, user_id: props.user_id })
    )
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setDirection(e.target.value)
  }

  useEffect(() => {
    setContents(props.contents)
  }, [props.contents])

  return (
    <>
      <Grid padding="16px">
        <Grid>
          {props.id ? (
            <Text bold fontSize="32px">
              게시글 수정
            </Text>
          ) : (
            <Text bold fontSize="32px">
              게시글 작성
            </Text>
          )}
        </Grid>
        <Grid>
          <FileUpload {...props} />
        </Grid>
        <Grid>
          <Text bold fontSize="32px">
            이미지 위치
          </Text>
          <input
            id="left"
            value="left"
            name="direction"
            type="radio"
            checked={direction === 'left' ? true : false}
            onChange={handleChange}
          />
          왼쪽
          <input
            id="right"
            value="right"
            name="direction"
            type="radio"
            checked={direction === 'right' ? true : false}
            onChange={handleChange}
          />
          오른쪽
          <input
            id="middle"
            value="middle"
            name="direction"
            type="radio"
            checked={direction === 'middle' ? true : false}
            onChange={handleChange}
          />
          중앙
        </Grid>

        <Grid>
          <Input
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
            value={contents}
            _onChange={(e) => setContents(e.target.value)}
          ></Input>
        </Grid>
        {props.id ? (
          <Button
            width="100%"
            padding="20px"
            margin="40px 0px"
            _onClick={modify}
          >
            게시글 수정
          </Button>
        ) : (
          <Button
            width="100%"
            padding="20px"
            margin="40px 0px"
            _onClick={upload}
          >
            게시글 작성
          </Button>
        )}
      </Grid>
    </>
  )
}

export default PostWrite
