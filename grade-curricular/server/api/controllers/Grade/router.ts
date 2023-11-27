import express from 'express';
import controller from './grade.controller';

export default express
    .Router()
    .get('/', controller.all)
    .get('/:id', controller.getById)
    .post('/:id', controller.post)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)
