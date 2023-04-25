import { Request, Response } from "express";
import {
  findAllCurrentWorkingVehicles,
  findAllFinishedVehiclesToday,
  findAllNewVehiclesToday,
  findAllVehiclesInShop,
  findAllVehiclesNotStarted,
} from "../../models/job-orders.model";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";
import {
  findAllCanceledInvoicesFromToday,
  findAllInDraftInvoicesFromToday,
  findAllPaidInvoicesFromToday,
  findAllPendingInvoicesFromToday,
} from "../../models/invoices.model";

async function httpGetCurrentWorkingVehicles(req: Request, res: Response) {
  try {
    const currentWorkingVehicles = await findAllCurrentWorkingVehicles();
    return res.status(200).json({
      metric: currentWorkingVehicles,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get current working vehicles",
      error,
      res
    );
  }
}

async function httpGetVehiclesInShop(req: Request, res: Response) {
  try {
    const vehiclesInShop = await findAllVehiclesInShop();
    return res.status(200).json({
      metric: vehiclesInShop,
    });
  } catch (error) {
    return handleExceptionErrorResponse("get vehicles in shop", error, res);
  }
}

async function httpGetVehiclesNotStarted(req: Request, res: Response) {
  try {
    const vehiclesNotStarted = await findAllVehiclesNotStarted();
    return res.status(200).json({
      metric: vehiclesNotStarted,
    });
  } catch (error) {
    return handleExceptionErrorResponse("get vehicles not started", error, res);
  }
}

async function httpGetNewVehiclesReceivedToday(req: Request, res: Response) {
  try {
    const newVehiclesFromToday = await findAllNewVehiclesToday();
    return res.status(200).json({
      metric: newVehiclesFromToday,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get new vehicles received today",
      error,
      res
    );
  }
}

async function httpGetFinishedVehiclesToday(req: Request, res: Response) {
  try {
    const finishedVehiclesFromToday = await findAllFinishedVehiclesToday();
    return res.status(200).json({
      metric: finishedVehiclesFromToday,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get finished vehicles today",
      error,
      res
    );
  }
}

async function httpGetTotalAmountPaidToday(req: Request, res: Response) {
  try {
    const invoicesPaidFromToday = await findAllPaidInvoicesFromToday();

    let totalAmount = 0;
    for (let invoice of invoicesPaidFromToday) {
      totalAmount += invoice.amountTotal;
    }

    return res.status(200).json({
      metric: totalAmount,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get total amount paid today",
      error,
      res
    );
  }
}

async function httpGetTotalAmountInDraftsToday(req: Request, res: Response) {
  try {
    const invoicesInDraftFromToday = await findAllInDraftInvoicesFromToday();

    let totalAmount = 0;
    for (let invoice of invoicesInDraftFromToday) {
      totalAmount += invoice.amountTotal;
    }

    return res.status(200).json({
      metric: totalAmount,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get total amount in drafts today",
      error,
      res
    );
  }
}

async function httpGetTotalAmountPendingToday(req: Request, res: Response) {
  try {
    const invoicesPendingFromToday = await findAllPendingInvoicesFromToday();

    let totalAmount = 0;
    for (let invoice of invoicesPendingFromToday) {
      totalAmount += invoice.amountTotal;
    }

    return res.status(200).json({
      metric: totalAmount,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get total amount pending today",
      error,
      res
    );
  }
}

async function httpGetTotalAmountCanceledToday(req: Request, res: Response) {
  try {
    const invoicesCanceledFromToday = await findAllCanceledInvoicesFromToday();

    let totalAmount = 0;
    for (let invoice of invoicesCanceledFromToday) {
      totalAmount += invoice.amountTotal;
    }

    return res.status(200).json({
      metric: totalAmount,
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "get total amount canceled today",
      error,
      res
    );
  }
}

export {
  httpGetCurrentWorkingVehicles,
  httpGetVehiclesInShop,
  httpGetVehiclesNotStarted,
  httpGetNewVehiclesReceivedToday,
  httpGetFinishedVehiclesToday,
  httpGetTotalAmountPaidToday,
  httpGetTotalAmountInDraftsToday,
  httpGetTotalAmountPendingToday,
  httpGetTotalAmountCanceledToday,
};
