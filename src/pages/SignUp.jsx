import { Button, Grid, Input, Text } from '../elements'

const SignUp = (props) => {
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
            <Input label="아이디" placeholder="아이디를 입력하세요."></Input>
          </Grid>
          <Grid margin="40px 0px">
            <Input label="닉네임" placeholder="닉네임를 입력하세요."></Input>
          </Grid>
          <Grid>
            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
            ></Input>
          </Grid>
          <Grid margin="40px 0px">
            <Input
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요."
            ></Input>
          </Grid>
        </Grid>
        <Grid>
          <Button width="100%" margin="40px 0px" padding="20px">
            회원가입하기
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp
