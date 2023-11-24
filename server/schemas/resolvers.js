const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        getUser: async (parent, { username }) => {
            const foundUser = await User.findOne({
              username: username,
            });
      
            if (!foundUser) {
              return "Cannot find a user with this id!";
            }
            return foundUser;
    },
},
Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
},
};

module.exports = resolvers;