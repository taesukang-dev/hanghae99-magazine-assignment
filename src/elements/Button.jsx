import styled from 'styled-components'

const Button = (props) => {
  const {
    children,
    text,
    _onClick,
    padding,
    margin,
    width,
    bg,
    color,
    circle,
  } = props
  const styles = { padding, bg, margin, color, width }
  if (circle) {
    return (
      <>
        <CircleButtonBox onClick={_onClick}>
          {text ? text : children}
        </CircleButtonBox>
      </>
    )
  }
  return (
    <>
      <ButtonBox {...styles} onClick={_onClick}>
        {text ? text : children}
      </ButtonBox>
    </>
  )
}

Button.defaultProps = {
  children: false,
  width: '',
  text: false,
  padding: '',
  _onClick: () => {},
  bg: '#aaa',
  margin: '',
  color: '#fff',
}

const ButtonBox = styled.button`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: 100%;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
`

const CircleButtonBox = styled.button`
  background-color: #fae102;
  width: 80px;
  height: 80px;
  font-size: 70px;
  font-weight: 900;
  border-radius: 50px;
  color: #000;
  position: fixed;
  right: 20px;
  bottom: 20px;
`

export default Button
