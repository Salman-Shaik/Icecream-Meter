const assert = require('chai').assert;
const request = require('supertest');
const path = require('path');
const app = require(path.resolve('app.js'));
const mockDataFileName = 'test/testMeterData.json';

describe("#APP", () => {
  beforeEach(function() {
    app.initialize(mockDataFileName);
  });
  describe("GET /members", done => {
    it('should get all members', done => {
      request(app)
        .get('/members')
        .expect(200)
        .end(done);
    });
  });
  describe("POST /member", done => {
    it('should create member with the given memberName', done => {
      request(app)
        .post('/member')
        .send({
          memberName: "user4"
        })
        .expect('Member Created Succesfully')
        .expect(201)
        .end(done);
    });
  });
  describe("PUT /count", done => {
    it('should update the count of ticks of given memberName', done => {
      request(app)
        .put('/count')
        .send({
          memberName: "user1"
        })
        .expect('Updated Meter Successfully')
        .expect(200)
        .end(done);
    });
  });
  describe("DELETE /member", done => {
    it('should delete member with the given memberName', done => {
      request(app)
        .delete('/member')
        .send({
          memberName: "user3"
        })
        .expect('Member Deleted Successfully')
        .expect(202)
        .end(done);
    });
  });
  describe("PUT /treat", done => {
    it('should decrement the actualCount by 5', done => {
      request(app)
        .put('/treat')
        .send({
          memberName: "user4"
        })
        .expect('Updated Ticks')
        .expect(202)
        .end(done);
    });
  });
});
