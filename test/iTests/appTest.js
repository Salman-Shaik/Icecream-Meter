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
        .expect('{"user1":5,"user2":1,"user3":0}')
        .expect(200)
        .end(done);
    });
  });
  describe("GET /tick", done => {
    it('should get the count of ticks of given memberName', done => {
      request(app)
        .get('/tick')
        .query({
          memberName: "user1"
        })
        .expect("5")
        .expect(200)
        .end(done);
    });
  });
  describe("POST /member", done => {
    it('should create member with the given memberName', done => {
      request(app)
        .post('/member')
        .query({
          memberName: "user4"
        })
        .expect('Member Created Succesfully')
        .expect(201)
        .end(done);
    });
  });
  describe("PUT /tick", done => {
    it('should update the count of ticks of given memberName', done => {
      request(app)
        .put('/tick')
        .query({
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
        .query({
          memberName: "user3"
        })
        .expect('Member Deleted Successfully')
        .expect(202)
        .end(done);
    });
  });
  describe("DELETE /tick", done => {
    it('should clear the count of ticks of given memberName', done => {
      request(app)
        .delete('/tick')
        .query({
          memberName: "user2"
        })
        .expect('Cleared Ticks Successfully')
        .expect(202)
        .end(done);
    });
  });
});
