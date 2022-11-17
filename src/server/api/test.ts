export default defineEventHandler(() => {
  console.log('Request received');

  return {
    api: 'works',
  };
});
