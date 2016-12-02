import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { fetchCurrencies } from './actions'
import * as reducers from './reducers'

import App from './components/App'
import VisibleCurrencies from './components/VisibleCurrencies'
import EditCurrencies from './components/EditCurrencies'

// Configure the store
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware))
let unsubscribe = store.subscribe(() => {
	// console.log(store.getState());
});
store.dispatch(fetchCurrencies());

// Define routes
let Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={VisibleCurrencies} />
		<Route path="edit" component={EditCurrencies} />
	</Route>
)

// Render the App
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>{Routes}</Router>
	</Provider>,
	document.querySelector('main')
)
