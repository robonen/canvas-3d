import {defineEventHandler} from 'h3';

export default defineEventHandler((event) => {
  console.log('Request received');

  return {
    api: 'works',
  };
});
