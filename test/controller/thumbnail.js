import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../build';
import models from '../../build/app/models'

const { User } = models;

chai.use(chaiHttp);

describe('POST /thumbnail route', function() {
  const object = {
    "baz": "qux",
    "foo": "bar"
  };

  const patch = [
    { "op": "replace", "path": "/baz", "value": "boo" }
  ];

  let Authorization;

  before(done => {
    User.destroy({
      where: {},
      truncate: true
    }).then(() => {
      chai.request(server)
        .post('/user/signup')
        .send({ username: 'hellouser', password: 'correctpassword' })
        .end(function(err, res){
          if (!err) {
            console.log('Login', res.body);
            Authorization = res.body.session;
          }
          done();
        });
    });
  });

  it('should not success with out session', done => {
    chai.request(server)
      .post('/patch')
      .send({ object, patch })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      })
  });

  it('should return success', done => {
    chai.request(server)
      .post('/thumbnail')
      .set('authorization', `Bearer ${Authorization}`)
      .send({ uri: "http://via.placeholder.com/350x350" })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      })
  });
});