import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Grid, Input, Text } from '../elements'
import { userCreators } from '../redux/modules/user'

const SignUp = (props) => {
  const dispatch = useDispatch()
  const [prevent, setPrevent] = useState(false)
  const [id, setId] = useState('')
  const [user_name, setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwd_check, setPwdCheck] = useState('')

  const signUp = () => {
    let reg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/
    if (
      id.search(reg) === -1 ||
      id.replace(/ /gi, '').length === 0 ||
      pwd.replace(/ /gi, '').length === 0 ||
      user_name.replace(/ /gi, '').length === 0 ||
      pwd !== pwd_check
    ) {
      setPrevent(true)
      alert('회원가입 앙대요!')
      return
    }
    dispatch(userCreators.signupFB(id, pwd, user_name))
  }
  const refresh = () => {
    setPrevent(false)
  }

  return (
    <>
      <Grid padding="16px" margin="80px 0px">
        <Grid>
          <Text bold fontSize="32px">
            회원가입
          </Text>
        </Grid>
        <Grid>
          <Grid margin="40px 0px">
            <Input
              label="아이디"
              placeholder="아이디를 입력하세요."
              _onChange={(e) => {
                setId(e.target.value)
              }}
              _onKeyUp={refresh}
            ></Input>
          </Grid>
          <Grid margin="40px 0px">
            <Input
              label="닉네임"
              placeholder="닉네임를 입력하세요."
              _onChange={(e) => {
                setUserName(e.target.value)
              }}
              _onKeyUp={refresh}
            ></Input>
          </Grid>
          <Grid>
            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              _onChange={(e) => {
                setPwd(e.target.value)
              }}
              _onKeyUp={refresh}
            ></Input>
          </Grid>
          <Grid margin="40px 0px">
            <Input
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요."
              _onChange={(e) => {
                setPwdCheck(e.target.value)
              }}
              _onKeyUp={refresh}
            ></Input>
          </Grid>
        </Grid>
        <Grid>
          <Button
            disabled={prevent}
            width="100%"
            margin="40px 0px"
            padding="20px"
            _onClick={signUp}
          >
            회원가입하기
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp
