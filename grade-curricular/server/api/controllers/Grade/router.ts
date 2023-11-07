import express from 'express'
import controller from './grade.controller'

export default express
    .Router()
    .get('/', controller.all)