import { Participan } from './../../../node_modules/.prisma/client/index.d';
import { Request, Response, response } from "express"
import {prisma} from '../../data/postgres';
import * as yup from 'yup';
const bcrypt = require('bcrypt');



export class ParticipanController {

    constructor() {}

    public  getParticipan = async (req: Request, res: Response) =>{
        const participan = await prisma.participan.findMany();
        return res.status(200).json(participan);
    }

    public getParticipanById = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const participan = await prisma.participan.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json(participan);
    }

    createSchema = yup.object({
        idUser: yup.number().required(),
        idSorteo: yup.number().required(),
        winner: yup.boolean().required()
    })

    public createParticipan = async (req: Request, res: Response) =>{
        try{
            const {idUser, idSorteo, winner} = req.body;
            await this.createSchema.validate({idUser, idSorteo, winner});
            const participan = await prisma.participan.create({
                data: {
                    idUser,
                    idSorteo,
                    winner
                }
            });
            return res.status(201).json(participan);
        }catch(error){
            return res.status(400).json(error)
        }
    }

    public updateParticipan = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const {idUser, idSorteo, winner} = req.body;
        const participan = await prisma.participan.update({
            where: {
                id: parseInt(id)
            },
            data: {
                idUser,
                idSorteo,
                winner
            }
        });
        return res.status(200).json(participan);
    }

    public deleteParticipan = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const participan = await prisma.participan.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json(participan);
    }


    

   





}