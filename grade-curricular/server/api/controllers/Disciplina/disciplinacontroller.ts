import {Request, Response} from 'express';
import DisciplinaService from '../../services/disciplina.service';

class DisciplinaController{

    all(_:Request, res:Response): void{
        DisciplinaService.all().then((r) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        DisciplinaService.getById(req.params['id']).then((r) => res.json(r));
    }
    post(req:Request, res:Response): void{
        if(req.body == undefined)
            res.status(400).end();
        DisciplinaService.saveNew(req.body).then((r) => res.json(r));
    }
    update(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "" || req.body == undefined)
            res.status(400).end();
        DisciplinaService.update(req.params['id'],req.body).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
    delete(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        DisciplinaService.delete(req.params['id']).then((r) => res.json(r));
    }
    updateEvent(req:Request, res:Response): void{
        DisciplinaService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
}
export default new DisciplinaController();