import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server, sequelize } from '../../build';
import models from '../../build/app/models'

const { User } = models;

chai.use(chaiHttp);

// Todo
// 1. Make different database for testing

describe('Sign up', function() {
  // Delete all users
  before(function (done) {
    User.destroy({
      where: {},
      truncate: true
    }).then(() => done());
  });

  it('should sign up successfully', done => {
    chai.request(server)
      .post('/user/signup')
      .send({ username: 'hellouser', password: 'correctpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.session).to.be.string;
        done();
      })
  });

  it('should not sign up with same password', done => {
    chai.request(server)
      .post('/user/signup')
      .send({ username: 'hellouser', password: 'correctpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('User already exists.');
        done();
      })
  });
});

describe('Login', function() {
  it('should login user successfully', done => {
    chai.request(server)
      .post('/user/login')
      .send({ username: 'hellouser', password: 'correctpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.session).to.be.string;
        done();
      })
  });

  it('should send appropriate error when username is wrong', done => {
    chai.request(server)
      .post('/user/login')
      .send({ username: 'wronguser', password: 'correctpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('User does not exist.');
        done();
      })
  });

  it('should send appropriate error when password is wrong', done => {
    chai.request(server)
      .post('/user/login')
      .send({ username: 'hellouser', password: 'wrongpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('Invalid Password.');
        done();
      })
  });
});

after(function () {
  sequelize.close();
});