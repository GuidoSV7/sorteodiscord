import { Router } from "express";


import { AuthRoutes } from "./auth/routes";


export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);






        //Migration
        // router.use('/api/migration',MigrationRoutes.routes);



    

        return router;
    }
}