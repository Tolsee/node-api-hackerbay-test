import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server, appData } from '../../build';

chai.use(chaiHttp);

const { User } = appData.models;

// Todo
// 1. Make different database for testing
// 2. Test stays on a idle, process does not end
describe('Sign up', function() {
  // Delete all users
  before(function () {
    User.destroy({
      where: {},
      truncate: true
    });
  });

  it('should sign up successfully', done => {
    chai.request(server)
      .post('/user/signup')
      .send({ email: 'hello@gmail.com', password: 'correctpassword' })
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
      .send({ email: 'hello@gmail.com', password: 'correctpassword' })
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
      .send({ email: 'hello@gmail.com', password: 'correctpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.session).to.be.string;
        done();
      })
  });

  it('should send appropriate error when email is wrong', done => {
    chai.request(server)
      .post('/user/login')
      .send({ email: 'hell@gmail.com', password: 'correctpassword' })
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
      .send({ email: 'hello@gmail.com', password: 'wrongpassword' })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.equal('Invalid Password.');
        done();
      })
  });
});