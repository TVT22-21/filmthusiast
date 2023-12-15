/*const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('JWT Controller', function() {
  it('should issue a JWT token for valid credentials', async function() {
    const res = await request(app)
      .post('/login/login')
      .send({ username: 'keijo', password: 'keijo' }); // Use the mock credentials

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
  
  it('should not issue a token with invalid credentials', async function() {
    const res = await request(app)
      .post('/login/login')
      .send({ username: 'wronguser', password: 'wrongpassword' });
  
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error').that.equals('Invalid credentials');
  });

  // Additional tests as needed...
});*/