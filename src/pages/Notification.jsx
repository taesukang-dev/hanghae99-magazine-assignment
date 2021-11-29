import NotiPost from '../components/NotiPost'
import { Grid } from '../elements'

const Notification = (props) => {
  return (
    <>
      <Grid padding="16px" bg="#ddd">
        <NotiPost />
        <NotiPost />
        <NotiPost />
      </Grid>
    </>
  )
}

export default Notification
