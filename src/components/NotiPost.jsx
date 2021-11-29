import styled from 'styled-components'
import { Grid, Image, Text } from '../elements'

const NotiPost = (e) => {
  return (
    <>
      <Grid margin="10px 0px" padding="16px" side_flex bg="#fff">
        <Grid width="auto">
          <Image size="100"></Image>
        </Grid>
        <Grid margin="0px 0px 0px 20px">
          <Text>
            <BoldLabel>nickname</BoldLabel> 님이 게시글에 좋아요를 남겼습니다!
          </Text>
        </Grid>
      </Grid>
    </>
  )
}

const BoldLabel = styled.label`
  font-weight: 700;
`

export default NotiPost
