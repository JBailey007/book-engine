const { User } = require("../models");
const { signToken , AuthenticationError } = require("../utils/auth");
// const { AuthenticationError } = require('@apollo/server');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                data = await User.findOne({_id: context.user._id}).select('-__v -password');
                return data;
            }
  
    },
},
Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {

        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    saveBook: async (parent, { newBook }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: newBook }},
            { new: true }
          );
          return updatedUser;
        }
      }, 
    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId }}},
            { new: true }
          );
          return updatedUser;
        }
      }, 
}
};

module.exports = resolvers;