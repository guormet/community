import router from '@/router'

const errorHandle = ( err ) => {
  console.log( err.error );
  router.push('/login')
};

export default errorHandle;
