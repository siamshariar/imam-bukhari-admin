module.exports = () => {
  return async (ctx, next) => {
    if (ctx.request.path === '/') {
      ctx.redirect('/admin');
    } else {
      await next();
    }
  };
};
