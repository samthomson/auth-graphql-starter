const graphql = require('graphql')
const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLString
} = graphql

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: {
		email: { type: GraphQLString },
		id: { type: GraphQLID }
	}
})

module.exports = UserType