import { Router } from "express";


import { AuthRoutes } from "./auth/routes";
import { UsuarioRoutes } from "./usuarios/routes";
import { SorteoRoutes } from "./sorteos/routes";
import { ParticipanRoutes } from "./participan/routes";


export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/usuarios', UsuarioRoutes.routes);
        router.use('/api/sorteos', SorteoRoutes.routes);
        router.use('/api/participan', ParticipanRoutes.routes);
        






        //Migration
        // router.use('/api/migration',MigrationRoutes.routes);



    

        return router;
    }
}