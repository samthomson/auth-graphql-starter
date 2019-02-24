import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'


import App from './components/App'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm';

import requireAuth from './components/requireAuth'

const networkInterface = createNetworkInterface({
	opts: {
		credentials: 'same-origin'
	},
	uri: '/graphql'
})

const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: o => o.id
})

const Root = () => {
  return (
	<ApolloProvider client={client} >
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<Route path="login" component={LoginForm} />
				<Route path="signup" component={RegisterForm} />
				<Route path="dashboard" component={requireAuth(Dashboard)} />
			</Route>
		</Router>
	</ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
