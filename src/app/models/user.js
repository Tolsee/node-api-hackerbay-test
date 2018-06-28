// @flow
'use strict';

export default function User(sequelize: any, DataTypes: any) {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });

  return User;
}