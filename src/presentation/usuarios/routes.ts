import { Router } from "express";
import { UsuarioController } from './controller';



export class UsuarioRoutes {

    static get routes(): Router{

        const router = Router();
        
        const usuarioController = new UsuarioController();

        router.get('/', usuarioController.getUsuarios);
        router.get('/:id', usuarioController.getUsuarioById);
        router.post('/', usuarioController.createUsuario);
        router.put('/:id', usuarioController.updateUsuario);
        router.delete('/:id', usuarioController.deleteUsuario);

        //Personales
        
        
        return router;
    }
}