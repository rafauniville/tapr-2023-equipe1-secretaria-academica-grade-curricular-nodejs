import { Request, Response } from 'express'
import gradeService from 'server/api/services/grade.service';

class GradeController {
    all(_:Request, res:Response): void {
        gradeService.all().then(r => res.json(r));
    }
}

export default new GradeController();