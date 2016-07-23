export default async (ctx, next) => {
  console.log('Request started');
  await next();
  console.log('Request done');
}