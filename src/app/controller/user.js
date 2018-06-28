// @flow
'use strict';
type args = {
  User: any
};

const Get = (models: args) => (req: Object, res: Object) => {
  // Todo
  // Add ability to set different routes from same file
  // for ex:
  // POST /login
  // POST /signup
  // From same file
  console.log(models);
  models.User.sync()
    .then(() => {
      return models.User.create({
        firstName: 'Tulsi',
        lastName: 'Sapkota'
      })
    }).then(() => {
      return res.status(200).json({
        success: true
      });
    });
};

export { Get };