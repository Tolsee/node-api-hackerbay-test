// @flow
'use strict';

import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    throw err;
  });

const createModal = (model) => {
  model(sequelize);
};

export { sequelize, createModal };
