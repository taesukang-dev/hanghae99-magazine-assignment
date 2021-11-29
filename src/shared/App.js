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

function App() {
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
      </ConnectedRouter>
      <Button circle>+</Button>
    </div>
  )
}

export default App
