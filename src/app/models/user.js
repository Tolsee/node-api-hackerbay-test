// @flow
'use strict';
import Sequelize from 'sequelize';

export default function User(sequelize: any) {
  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
}