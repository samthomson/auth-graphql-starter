import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import currentUserQuery from './../queries/CurrentUser'
import logoutMutation from '../mutations/Logout'

class Header extends Component {

	onLogoutClick() {
		this.props.mutate({
			refetchQueries: [{ query: currentUserQuery }]
		})
	}

	renderButtons() {
		const { loading, user } = this.props.data

		if (loading) { return <div /> }

		if (user) {
			return <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
		} else {
			return (
				<div>
					<li>
						<Link to="/signup">signup</Link>
					</li>
					<li>
						<Link to="/login">login</Link>
					</li>
				</div>
			)
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo left">
						Home
					</Link>
					<ul className="right">
						{this.renderButtons()}
					</ul>
				</div>
			</nav>
		)
	}
}

export default graphql(logoutMutation)(
	graphql(currentUserQuery)(Header)
)