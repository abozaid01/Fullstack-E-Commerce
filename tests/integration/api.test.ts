import request from 'supertest';
import server from '../../src/server';

describe('GET /api/v1/products', () => {
  it('should GET All Products', async () => {
    const response = await request(server).get('/api/v1/products');
    expect(response.status).toBe(200);
  });
});

// afterAll(async () => {
//   server.close();
// });
