import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Grid, Text } from '../elements'
import { imageCreators } from '../redux/modules/image'

const FileUpload = (props) => {
  const dispatch = useDispatch()
  const [fileName, setFileName] = useState('파일 선택')
  const fileInput = useRef()

  const fileSelect = (e) => {
    const reader = new FileReader()
    const file = fileInput.current.files[0]
    reader.readAsDataURL(file)
    reader.onloadend = (e) => {
      document.querySelector('#img').src = e.target.result
      dispatch(imageCreators.setPreview(e.target.result))
    }
    setFileName(fileInput.current.files[0].name)
  }

  return (
    <>
      <Grid margin="20px 0px">
        <Grid side_flex>
          <NameInput value={fileName} disabled></NameInput>
          <FileLabel htmlFor="fileInput">이미지 선택</FileLabel>
        </Grid>
        <FileInput
          type="file"
          id="fileInput"
          ref={fileInput}
          onChange={fileSelect}
        />

        <Grid margin="40px 0px 40px 0px">
          <Text bold fontSize="28px">
            미리보기
            <img src={props.image_url ? props.image_url : ''} id="img" alt="" />
          </Text>
        </Grid>
      </Grid>
    </>
  )
}

const NameInput = styled.input`
  font-size: 20px;
  width: 100%;
  border-bottom: 1px solid black;
  width: 80%;
`

const FileLabel = styled.label`
  display: inline-block;
  background-color: #ddd;
  padding: 10px;
  width: auto;
`

const FileInput = styled.input`
  display: none;
`

export default FileUpload
