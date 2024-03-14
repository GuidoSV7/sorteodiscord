import { Request, Response, response } from "express"
import {prisma} from '../../data/postgres';
import * as yup from 'yup';
const bcrypt = require('bcrypt');



export class SorteoController {

    constructor() {}

    public  getSorteos = async (req: Request, res: Response) =>{
        const sorteos = await prisma.sorteo.findMany();
        return res.status(200).json(sorteos);
    }

    public getSorteoById = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const sorteo = await prisma.sorteo.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json(sorteo);
    }

    createSchema = yup.object({
        name: yup.string().required(),
        date: yup.date().required()
    })

    public createSorteo = async (req: Request, res: Response) =>{
        try{
            const {name, date} = req.body;
            await this.createSchema.validate({name, date});
            const sorteo = await prisma.sorteo.create({
                data: {
                    name,
                    date
                }
            });
            return res.status(201).json(sorteo);
        }catch(error){
            return res.status(400).json(error)
        }
    }


    public updateSorteo = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const {name, date} = req.body;
        const sorteo = await prisma.sorteo.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                date
            }
        });
        return res.status(200).json(sorteo);
    }

    public deleteSorteo = async (req: Request, res: Response) =>{
        const {id} = req.params;
        const sorteo = await prisma.sorteo.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json(sorteo);
    }







}