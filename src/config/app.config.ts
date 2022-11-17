export  const EnvConfiguration=()=>({
    //aca se mapear mis vareables de entorno a un objeto EnvConfiguration

    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    //el valor de JOI el el primero en validar en ves de este
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,

})