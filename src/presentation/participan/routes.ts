import { Router } from "express";
import { ParticipanController } from './controller';



export class ParticipanRoutes {

    static get routes(): Router{

        const router = Router();
        
        const participanController = new ParticipanController();

        router.get('/', participanController.getParticipan);
        router.get('/:id', participanController.getParticipanById);
        router.post('/', participanController.createParticipan);
        router.put('/:id', participanController.updateParticipan);
        router.delete('/:id', participanController.deleteParticipan);

        //Personales
        
        
        return router;
    }
}