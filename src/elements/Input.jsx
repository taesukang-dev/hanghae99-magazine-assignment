import styled from 'styled-components'
import Button from './Button'
import { Text, Grid } from './index'

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, _onKeyUp, value } =
    props

  if (multiLine) {
    return (
      <Grid>
        {label && <Text fontSize="14px">{label}</Text>}
        <TextareaBox
          rows="10"
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></TextareaBox>
      </Grid>
    )
  }

  return (
    <>
      <Grid>
        {label && <Text fontSize="14px">{label}</Text>}
        <InputBox
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyUp={_onKeyUp}
        ></InputBox>
      </Grid>
    </>
  )
}

Input.defaultProps = {
  label: false,
  placeholder: '텍스트를 입력해주세요.',
  value: '',
  _onChange: () => {},
  _onKeyUp: () => {},
  type: 'text',
}

const InputBox = styled.input`
  border: 1px solid #000;
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
`

const TextareaBox = styled.textarea`
  border: 3px solid #000;
  width: 100%;
  padding: 20px 10px;
  resize: none;
  box-sizing: border-box;
`

export default Input
