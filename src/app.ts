import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';



(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer( server.app );



  server.setRoutes( AppRoutes.routes );



  httpServer.listen( envs.PORT, () => {
    console.log(`Server running on port: ${ envs.PORT }`);
  })
}