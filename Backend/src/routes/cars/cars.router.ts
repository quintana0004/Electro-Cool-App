import express from 'express';
import { httpAddCar, httpGetCarByVIN } from './cars.controller';


const router = express.Router();

router.get("/search", httpGetCarByVIN);

router.post("/", httpAddCar);


export default router;