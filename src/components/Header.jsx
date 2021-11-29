import { Button, Grid } from '../elements'
import { history } from '../redux/configureStore'

const Header = (props) => {
  const toMain = () => {
    history.push('/')
  }
  const toSignup = () => {
    history.push('/signup')
  }

  const toSignin = () => {
    history.push('/signin')
  }

  return (
    <Grid side_flex padding="16px">
      <Grid pointer bg="#ddd" width="50px" height="50px" _onClick={toMain}>
        Logo ㅋㅋ
      </Grid>
      <Grid width="auto">
        <Button padding="16px" _onClick={toSignup}>
          회원가입
        </Button>
        <Button padding="16px" margin="0px 0px 0px 10px" _onClick={toSignin}>
          로그인
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
