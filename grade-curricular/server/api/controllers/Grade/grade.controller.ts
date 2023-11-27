import { Request, Response } from 'express';
import gradeService from '../../services/grade.service';

class GradeController {
  all(_: Request, res: Response): void {
    gradeService.all().then((r) => res.json(r));
  }
  getById(req: Request, res: Response): void {
    if (req.params['id'] == undefined || req.params['id'] == '')
      res.status(400).end();
    gradeService.getById(req.params['id']).then((r) => res.json(r));
  }
  post(req:Request, res:Response): void{
    if(req.body == undefined)
        res.status(400).end();
    gradeService.saveNew(req.body).then((r) => res.json(r));
  }
  update(req:Request, res:Response): void{
    if(req.params['id'] == undefined || req.params['id'] == "" || req.body == undefined)
        res.status(400).end();
    gradeService.update(req.params['id'],req.body).then((r) => res.json(r)).catch(() => res.status(404).end());
}
delete(req:Request, res:Response): void{
    if(req.params['id'] == undefined || req.params['id'] == "")
        res.status(400).end();
    gradeService.delete(req.params['id']).then((r) => res.json(r));
}
}

export default new GradeController();
