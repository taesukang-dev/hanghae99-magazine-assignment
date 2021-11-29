import styled from 'styled-components'

const Image = (props) => {
  const { circle, bg, src, size, children, rectangle } = props
  const styles = { bg, src, size }

  if (circle) {
    return (
      <>
        <CircleImageBox {...styles}>{children}</CircleImageBox>
      </>
    )
  } else if (rectangle) {
    return (
      <>
        <AspectOutter>
          <AspectInner {...styles}></AspectInner>
        </AspectOutter>
      </>
    )
  }
  return (
    <>
      <RectangleImageBox {...styles} />
    </>
  )
}

Image.defaultProps = {
  size: 36,
  bg: '',
  src: 'https://t1.daumcdn.net/cfile/tistory/237FF64355E3910116',
}

const RectangleImageBox = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
`

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`

const CircleImageBox = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
`

export default Image
