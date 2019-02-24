import gcl from 'graphql-tag'

export default gcl`
	mutation {
		logout {
			id
			email
		}
	}
`