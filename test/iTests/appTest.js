const assert = require('chai').assert;
const request = require('supertest');
const path = require('path');
const app = require(path.resolve('app.js'));
const mockMemberDataFile = 'test/testMeterData.json';
const mockUserDataFile = 'test/testUserInfo.json';

describe("#APP", () => {

  beforeEach(function() {
    app.initialize(mockMemberDataFile,mockUserDataFile);
  });

  describe("GET Member Data", done => {
    it('should get all members', done => {
      request(app)
        .get('/members')
        .expect(200)
        .end(done);
    });
  });

  describe("Create Member", done => {
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

  describe("Update Count", done => {
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

  describe("DELETE member", done => {
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

  describe("Update treat status", done => {
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

  describe("Login", done =>{
    it('should login the user', done => {
      request(app)
        .post('/login')
        .send({
          userName: "tom",
          password: "bethany"
        })
        .expect('Login Succesful')
        .expect(200)
        .end(done);
    })
    it('should send bad request with message invalid password', done => {
      request(app)
        .post('/login')
        .send({
          userName: "tom",
          password: "password"
        })
        .expect('Invalid Password')
        .expect(400)
        .end(done);
    })
    it('should send bad request with message for invalid username', done => {
      request(app)
        .post('/login')
        .send({
          userName: "a",
          password: "password"
        })
        .expect('Username Doesn\'t exist')
        .expect(400)
        .end(done);
    })
  })
});
