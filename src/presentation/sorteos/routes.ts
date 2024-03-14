import { Router } from "express";
import { SorteoController } from './controller';



export class SorteoRoutes {

    static get routes(): Router{

        const router = Router();
        
        const sorteoController = new SorteoController();

        router.get('/', sorteoController.getSorteos);
        router.get('/:id', sorteoController.getSorteoById);
        router.post('/', sorteoController.createSorteo);
        router.put('/:id', sorteoController.updateSorteo);
        router.delete('/:id', sorteoController.deleteSorteo);

        //Personales
        
        
        return router;
    }
}