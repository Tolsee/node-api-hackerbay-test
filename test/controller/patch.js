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

  it('should return success', done => {
    chai.request(server)
      .post('/patch')
      .send({ object, patch })
      .end(function(err, res){
        expect(err).to.be.null;
        console.log(res);
        expect(res).to.have.status(200);
        expect(res.body.data['baz']).to.equal('boo');
        expect(res.body.data['foo']).to.equal('bar');
        done();
      })
  });
});