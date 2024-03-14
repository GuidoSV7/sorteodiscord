import { Request, Response } from "express";
import {prisma} from '../../data/postgres';
import * as yup from 'yup';


const bcrypt = require('bcrypt');


export class AuthController {

    constructor() {}

     loginSchema = yup.object({

        username: yup.string().required(),
        idDiscord: yup.string().min(6).required(),
    
    })

    public login = async (req:Request, res:Response) => {
        try {

            const requestData = await req.body;
            
            const { username, idDiscord} = await this.loginSchema.validate({
                ...requestData,
            });
    
    
            const user = await prisma.user.findFirst({where: {username}});
    
            if(!user){
                return res.status(400).json({message: `El ${username} no existe en la Base de Datos`});
            }
    
            // Verificar la contraseña
            const validPassword = await bcrypt.compareSync(idDiscord, user.idDiscord);
                if (!validPassword) {
                    return res.status(400).json({message: 'Password incorrecto  ' });
                    }
    
            return res.status(200).json({message: 'Usuario encontrado'});
        } catch (error) {
            return res.status(200).json(error);
        }
    
    }


    registerSchema = yup.object({
        name: yup.string().required(),
        username: yup.string().required(),
        idDiscord: yup.string().min(6).required(),
        idrol: yup.number().required(),
    })

    public register = async (req:Request, res:Response) => {
        try {
            const requestData = await req.body;
            const { name, username, idDiscord, idrol } = await this.registerSchema.validate({
                ...requestData,
                
            });
    
            // Encripta la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(idDiscord, 10); // El segundo argumento es el número de rondas de hash
    
            const user = await prisma.user.create({

                data: {
                    username,
                    idDiscord: hashedPassword,
                    idrol,
                }
            });
                
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }

    }

}