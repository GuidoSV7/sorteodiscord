import { Request, Response } from "express";
import {prisma} from '../../data/postgres';
import * as yup from 'yup';


const bcrypt = require('bcrypt');


export class AuthController {

    constructor() {}

     loginSchema = yup.object({

        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    
    })

    public login = async (req:Request, res:Response) => {
        try {

            const requestData = await req.body;
            
            const { email, password} = await this.loginSchema.validate({
                ...requestData,
            });
    
    
            const user = await prisma.user.findFirst({where: {email}});
    
            if(!user){
                return res.status(400).json({message: `El ${email} no existe en la Base de Datos`});
            }
    
            // Verificar la contraseña
            const validPassword = await bcrypt.compareSync(password, user.password);
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
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        idrol: yup.number().required(),
    })

    public register = async (req:Request, res:Response) => {
        try {
            const requestData = await req.body;
            const { name, email, password, idrol } = await this.registerSchema.validate({
                ...requestData,
                
            });
    
            // Encripta la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10); // El segundo argumento es el número de rondas de hash
    
            const user = await prisma.user.create({

                data: {
                    name,
                    email,
                    password: hashedPassword,
                    idrol,
                }
            });
                
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }

    }

}