import {Request, Response} from 'express';
import CursoService from '../../services/curso.service';
// import DaprServer from '@dapr/dapr/implementation/Server/DaprServer';
// import { CommunicationProtocolEnum } from '@dapr/dapr';

class CursoController{

    all(_:Request, res:Response): void{
        CursoService.all().then((r) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        CursoService.getById(req.params['id']).then((r) => res.json(r));
    }
    post(req:Request, res:Response): void{
        if(req.body == undefined)
            res.status(400).end();
        CursoService.saveNew(req.body).then((r) => res.json(r));
    }
    update(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "" || req.body == undefined)
            res.status(400).end();
        CursoService.update(req.params['id'],req.body).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
    delete(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        CursoService.delete(req.params['id']).then((r) => res.json(r));
    }
    updateEvent(req:Request, res:Response): void{
        CursoService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
}
export default new CursoController();