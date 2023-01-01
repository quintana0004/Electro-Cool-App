import { ITask } from "./../../types/index.d";
import { Request, Response } from "express";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import {
  hasRequiredTaskFields,
  isValidCompanyId,
  isIsoDate,
  isValidTaskId,
} from "../../utils/validators.utils";
import { createTask, deleteTask } from "../../models/tasks.model";

async function httpGetAllTasks(req: Request, res: Response) {
  try {
    return res.status(200).json("Get All Tasks");
  } catch (error) {
    return handleExceptionErrorResponse("get all tasks", error, res);
  }
}

async function httpCreateTask(req: Request, res: Response) {
  try {
    const taskInfo: ITask = {
      text: req.body.text,
      dueDate: req.body.dueDate,
      companyId: req.body.companyId,
    };

    const hasRequiredFields = hasRequiredTaskFields(taskInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create task. Please provide the following fields: text, dueDate and companyId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(taskInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isDateFormatValid = isIsoDate(taskInfo.dueDate);
    if (!isDateFormatValid) {
      return handleBadResponse(
        400,
        `The date provided for the Due Date is not valid. The correct format must be in ISO as the following: "YYYY-MM-DDTHH:MN:SS.MSSZ".`,
        res
      );
    }

    const createdTask = await createTask(taskInfo);
    return res.status(200).json(createdTask);
  } catch (error) {
    return handleExceptionErrorResponse("create task", error, res);
  }
}

async function httpDeleteTask(req: Request, res: Response) {
  try {
    const taskId = req.params.id;

    const isTaskIdValid = await isValidTaskId(taskId);
    if (!isTaskIdValid) {
      return handleBadResponse(
        400,
        "The task Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const deletedTask = await deleteTask(Number(taskId));
    return res.status(200).json(deletedTask);
  } catch (error) {
    return handleExceptionErrorResponse("delete task", error, res);
  }
}

export { httpGetAllTasks, httpCreateTask, httpDeleteTask };
