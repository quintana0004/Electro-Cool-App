import { Request, Response } from "express";
import { findAllJobOrders } from "../../models/job-orders.model";

async function httpGetAllJobOrders(req: Request, res: Response) {
  try {
    let take = req.query.take ? +req.query.take : 0;
    let skip = req.query.skip ? +req.query.skip : 0;

    const jobOrders = await findAllJobOrders(skip, take);

    res.status(200).json(jobOrders);
  } catch (error) {
    res.status(500).json("Error in Get All Job Orders");
  }
}

export { httpGetAllJobOrders };
