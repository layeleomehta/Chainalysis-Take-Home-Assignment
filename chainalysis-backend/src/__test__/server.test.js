const request = require('supertest')
const app = require('../server')

it('makes successful request', async () => {

  const response = await request(app)
  .get('/api')
  .send()
  .expect(200);
});

it('contains the right keys in the response', async () => {

    const response = await request(app)
    .get('/api')
    .send()
    .expect(200);

    const keys = new Set(Object.keys(response.body)); 
    const expectedKeys = ["bitcoin", "ethereum", "recommendation"]; 

    for(const key of expectedKeys){
        expect(keys.has(key)).toEqual(true); 
    }
  });