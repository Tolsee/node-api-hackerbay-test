export default (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};