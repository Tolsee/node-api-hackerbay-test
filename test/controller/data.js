import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../build';

chai.use(chaiHttp);

describe('GET /data route', function() {
  it('should data successfully', done => {
    chai.request(server)
      .get('/data')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.equal('Any string');
        done();
      })
  });
});

describe('POST /data route', function() {
  it('should store data and return successfully', done => {
    chai.request(server)
      .post('/data')
      .send({
        data: 'Any thing'
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.equal('Any thing');
        done();
      })
  });
});