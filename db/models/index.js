const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //use this to send parameters to the association defined in the model
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
};

module.exports = setupModels;
