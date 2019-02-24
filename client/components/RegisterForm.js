import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import registerMutation from '../mutations/registerMutation'
import currentUserQuery from '../queries/CurrentUser'

class RegisterForm extends Component {

	constructor(props) {
		super(props)

		this.state = { errors: [] }
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
				<h3>signup</h3>
				<AuthForm
					errors={this.state.errors}
					onSubmit={this.onSubmit.bind(this)}
				/>	
			</div>
		)
	}
}

export default graphql(registerMutation)(RegisterForm)