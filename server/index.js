// eslint-disable-next-line import/no-extraneous-dependencies
import Fastify from 'fastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastifyCors from '@fastify/cors';

const notes = [
  {
    id: 1,
    title: 'Note 1',
    content: 'Content 1',
  },
  {
    id: 2,
    title: 'Note 2',
    content: 'Content 2',
  },
];

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyCors, {
  origin: 'http://localhost:5173',
});

fastify.listen({ port: 8082 }, (err, address) => {
  if (err) {
    throw err;
  }
  console.log(`Server is now listening on ${address}`);
});

fastify.post('/api/auth/signin', async (request, reply) => {
  try {
    await timeout();
    const { email, password } = request.body;
    if (email === 'root' && password === 'root') {
      reply.send({
        token: 'ASDASJLHASJKLHl2317846239845yrLASDHJASKLDHASJKLFhyu234',
        tokenType: 'Bearer',
      });
    } else {
      reply.status(400).send({
        statusCode: 400,
        message: 'Invalid email or password',
      });
    }
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

fastify.get('/api/note', async (request, reply) => {
  try {
    await timeout();
    reply.send(notes);
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

fastify.post('/api/note', async (request, reply) => {
  try {
    await timeout();
    const { title, content } = request.body;
    const newNote = {
      id: notes.length + 1,
      title,
      content,
    };
    notes.push(newNote);
    reply.send(newNote);
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

fastify.put('/api/note/:id', async (request, reply) => {
  try {
    await timeout();
    const { id } = request.params;
    const note = notes.find((noteEl) => noteEl.id === Number(id));
    const { title, content } = request.body;
    note.title = title;
    note.content = content;
    reply.send(note);
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

fastify.delete('/api/note/:id', async (request, reply) => {
  try {
    await timeout();
    const { id } = request.params;
    const noteIndex = notes.findIndex((noteEl) => noteEl.id === Number(id));
    notes.splice(noteIndex, 1);
    reply.send({
      statusCode: 200,
      message: 'Note deleted',
    });
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

fastify.get('/api/note/:id', async (request, reply) => {
  try {
    await timeout();
    const { id } = request.params;
    const note = notes.find((noteEl) => noteEl.id === Number(id));
    reply.send(note);
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

fastify.get('/api/profile', async (request, reply) => {
  try {
    await timeout();
    const user = {
      id: 1,
      email: 'root',
    };
    reply.send(user);
  } catch (e) {
    reply.status(500).send({
      statusCode: 500,
      message: 'WTF',
    });
  }
});

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error('Random Error'));
      }
    }, 300);
  });
}
