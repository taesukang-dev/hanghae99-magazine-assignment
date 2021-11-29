import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import post from './modules/post'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  Post: post,
  router: connectRouter(history),
})

const middlewares = [thunk.withExtraArgument({ history })]

const env = process.env.NODE_ENV
if (env === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

let store = (initialStore) => createStore(rootReducer, enhancer)

export default store()
