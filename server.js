const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function rewrite(pageName) {
  return async function(ctx) {
    await app.render(ctx.req, ctx.res, `/${pageName}`, ctx.query);
    ctx.respond = false;
  }
}

app.prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();

    router.get('/', rewrite('home'));
    router.get('/about', rewrite('about'));
    router.get('/login', rewrite('login'));
    router.get('/register', rewrite('register'));
    router.get('/settings', rewrite('settings'));
    router.get('/users/:id', rewrite('profile'));
    router.get('/users/:id/blogs/', rewrite('user-blog-list'));
    router.get('/users/:id/likes/', rewrite('user-likes'));
    router.get('/blogs/edit', rewrite('edit-blog'));
    router.get('/admin/users/', rewrite('user-list'));
    router.get('/admin/blogs/', rewrite('blog-list'));

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes());
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
