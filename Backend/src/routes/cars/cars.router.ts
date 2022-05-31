import express from 'express';
import { httpAddCar } from './cars.controller';


const router = express.Router();

router.post("/", httpAddCar);


export default router;