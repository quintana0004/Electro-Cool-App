import { Request, Response } from "express";
import { findAllJobOrders } from "../../models/job-orders.model";

async function httpGetAllJobOrders(req: Request, res: Response) {
  try {
    const jobOrders = await findAllJobOrders();

    res.status(200).json(jobOrders);
  } catch (error) {
    res.status(500).json("Error in Get All Job Orders");
  }
}

export { httpGetAllJobOrders };
