import styled from 'styled-components'

const Grid = (props) => {
  const {
    margin,
    padding,
    bg,
    width,
    side_flex,
    center,
    height,
    children,
    _onClick,
    pointer,
  } = props

  const styles = {
    margin,
    padding,
    bg,
    width,
    side_flex,
    center,
    height,
    pointer,
  }
  return (
    <>
      <GridBox onClick={_onClick} {...styles}>
        {children}
      </GridBox>
    </>
  )
}

Grid.defaultProps = {
  margin: '',
  padding: '',
  bg: '',
  width: '100%',
  height: '100%',
  side_flex: false,
  center: false,
  pointer: false,
  _onClick: () => {},
}

const GridBox = styled.div`
  cursor: ${(props) => (props.pointer ? 'pointer' : '')};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) =>
    props.side_flex
      ? 'display: flex; align-items: center; justify-content: space-between;'
      : ''}
  ${(props) => (props.center ? 'text-align: center;' : '')}
  box-sizing: border-box;
`

export default Grid
