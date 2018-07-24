import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../build';

chai.use(chaiHttp);

describe('POST /patch route', function() {
  const object = {
    "baz": "qux",
    "foo": "bar"
  };

  const patch = [
    { "op": "replace", "path": "/baz", "value": "boo" }
  ];

  let Authorization;

  beforeEach(done => {
      chai.request(server)
        .post('/user/login')
        .send({ username: 'hellouser', password: 'correctpassword' })
        .end(function(err, res){
          if (!err) {
            console.log('Login', res.body);
            Authorization = res.body.session;
          }
          done();
        });
  });

  it('should return success', done => {
    chai.request(server)
      .post('/patch')
      .set('Authorization', `Bearer ${Authorization}`)
      .send({ object, patch })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.data['baz']).to.equal('boo');
        expect(res.body.data['foo']).to.equal('bar');
        done();
      })
  });
});