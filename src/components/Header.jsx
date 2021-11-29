import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, Grid } from '../elements'
import { history } from '../redux/configureStore'
import { userCreators } from '../redux/modules/user'

import { apiKey } from '../shared/firebase'

const Header = (props) => {
  const dispatch = useDispatch()
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key) ? true : false
  const is_login = useSelector((state) => state.user.is_login)

  const toMain = () => {
    history.push('/')
  }
  const toSignup = () => {
    history.push('/signup')
  }

  const toSignin = () => {
    history.push('/signin')
  }

  const signout = () => {
    dispatch(userCreators.signoutFB())
  }

  if (is_login && is_session) {
    return (
      <Grid side_flex padding="16px">
        <Grid pointer bg="#ddd" width="50px" height="50px" _onClick={toMain}>
          Logo ㅋㅋ
        </Grid>
        <Grid width="auto">
          <Button padding="16px">내 정보</Button>
          <Button padding="16px" margin="0px 0px 0px 10px">
            알림
          </Button>
          <Button padding="16px" margin="0px 0px 0px 10px" _onClick={signout}>
            로그아웃
          </Button>
        </Grid>
      </Grid>
    )
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
