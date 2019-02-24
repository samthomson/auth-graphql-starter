import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import loginMutation from './../mutations/loginMutation'
import currentUserQuery from './../queries/CurrentUser'
import { hashHistory } from 'react-router'

class LoginForm extends Component {

	constructor(props) {
		super(props)

		this.state = { errors: [] }
	}

	componentWillUpdate(nextProps) {
		if (!this.props.data.user && nextProps.data.user) {
			// redirect to dashboard
			hashHistory.push('/dashboard')
		}
	}

	onSubmit({email, password}) {
		this.props.mutate({
			refetchQueries: [{ query: currentUserQuery }],
			variables: { email, password }
		})
		.catch(res => {
			const errors = res.graphQLErrors.map(error => error.message)
			this.setState({ errors })
		})
	}
	render() {
		return (
			<div>
				<h3>login</h3>
				<AuthForm
					errors={this.state.errors}
					onSubmit={this.onSubmit.bind(this)}
				/>	
			</div>
		)
	}
}

export default graphql(currentUserQuery)(
	graphql(loginMutation)(LoginForm)
)