const http = require('http');

const users = [
  { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth', avatar: '' },
  { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver', avatar: '' },
];

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'application/json');

  if (request.url === '/health') {
    response.writeHead(200);
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (request.method === 'GET' && request.url.startsWith('/users')) {
    response.writeHead(200);
    response.end(JSON.stringify({ page: 2, per_page: 2, total: users.length, total_pages: 2, data: users }));
    return;
  }

  if (request.method === 'POST' && request.url === '/users') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      const payload = JSON.parse(body);
      response.writeHead(201);
      response.end(JSON.stringify({ ...payload, id: '777', createdAt: new Date().toISOString() }));
    });
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ error: 'not found' }));
});

server.listen(3100, '127.0.0.1');