import { Request, Response, response } from "express"
import {prisma} from '../../data/postgres';
import * as yup from 'yup';
const bcrypt = require('bcrypt');



export class UsuarioController {

    constructor() {}

    public  getUsuarios = async (req: Request, res: Response) =>{
        const usuarios = await prisma.user.findMany();
        return res.status(200).json(usuarios);
    }

    public getUsuarioById = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const usuario = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json(usuario);
    }

    createSchema = yup.object({
        username: yup.string().required(),
        idDiscord: yup.string().email().required(),
        idrol: yup.number().required()
    })

    public createUsuario = async (req: Request, res: Response) =>{
        try{
            const {username, idDiscord, idrol} = req.body;
            await this.createSchema.validate({username, idDiscord, idrol});
            const usuario = await prisma.user.create({
                data: {
                    username,
                    idDiscord,
                    idrol
                }
            });
            return res.status(201).json(usuario);
        }catch(error){
            return res.status(400).json(error)
        }
    }

    public updateUsuario = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const {username, idDiscord, idrol} = req.body;
        const usuario = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                username,
                idDiscord,
                idrol
            }
        });
        return res.status(200).json(usuario);
    }

    public deleteUsuario = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const usuario = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json(usuario);
    }



    

}