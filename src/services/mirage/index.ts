import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: string;
};

export const makeServer = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name() {
          return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        password() {
          return '123456';
        },
        avatarUrl() {
          return 'https://github.com/JulianoRamos.png';
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },
    // eslint-disable-next-line no-shadow
    seeds(server) {
      server.createList('user', 200);
    },
    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', (schema, request) => {
        const { page = 1, perPage = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(perPage);
        const pageEnd = pageStart + Number(perPage);

        const users = schema.all('user').models.slice(pageStart, pageEnd);

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });

      this.get('/users/:id');
      this.post('/users');

      this.post('/sessions', schema => {
        const user = schema.findBy('user', { id: '1' });
        return new Response(200, {}, { user, token: faker.random.uuid() });
      });

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
};
