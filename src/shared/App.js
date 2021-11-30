import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router'
import { history } from '../redux/configureStore'

import GlobalStyles from './GlobalStyles'
import PostList from '../pages/PostList'
import Header from '../components/Header'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import PostWrite from '../pages/PostWrite'
import Notification from '../pages/Notification'

import { Button } from '../elements'
import { useDispatch, useSelector } from 'react-redux'
import { apiKey } from './firebase'
import { userCreators } from '../redux/modules/user'
import { useEffect } from 'react'
import PostDetail from '../pages/PostDetail'
import PostModify from '../pages/PostModify'
import { likeCreators } from '../redux/modules/like'
import LeftPost from '../components/LeftPost'

function App() {
  const dispatch = useDispatch()
  const user_id = useSelector((state) => state.user.user.uid)
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key) ? true : false

  useEffect(() => {
    if (is_session) {
      dispatch(userCreators.loginCheckFB())
      dispatch(likeCreators.loadLikesFB(user_id))
    }
  }, [dispatch, is_session, user_id])

  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/notification" exact component={Notification} />
        <Route path="/detail/:id" exact component={PostDetail} />
        <Route path="/modify/:id" exact component={PostModify} />
        <Route path="/test" exact component={LeftPost} />
      </ConnectedRouter>
      <Button circle _onClick={() => history.push('/write')}>
        +
      </Button>
    </div>
  )
}

export default App
