// @flow
'use strict';

export default function User(sequelize: any, DataTypes: any) {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });

  User.sync();

  return User;
}