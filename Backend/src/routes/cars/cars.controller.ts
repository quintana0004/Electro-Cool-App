import { Request, Response } from 'express';

async function httpAddCar( req: Request, res: Response ) {
  res.json("--- ADD CAR ROUTE ---");
}


export {
  httpAddCar
}