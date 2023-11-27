import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import gradeRouter from './api/controllers/Grade/router';
import cursoRouter from './api/controllers/Curso/router';
import disciplinaRouter from './api/controllers/Disciplina/router';

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/grades', gradeRouter);
  app.use('/api/v1/cursos', cursoRouter);
  app.use('/api/v1/disciplinas', disciplinaRouter);
}
