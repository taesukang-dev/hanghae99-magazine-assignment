import styled from 'styled-components'

const Text = (props) => {
  const { children, color, bold, margin, fontSize, inline } = props
  const styles = { color, bold, margin, fontSize, inline }
  return (
    <>
      <TextBox {...styles}>{children}</TextBox>
    </>
  )
}

Text.defaultProps = {
  color: '#404040',
  bold: false,
  fontSize: '',
  inline: false,
}

const TextBox = styled.p`
  ${(props) => (props.inline ? 'display: inline-block;' : '')}
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? '700' : '400')};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
`

export default Text
