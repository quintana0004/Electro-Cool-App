import prisma from "../database/prisma";
import { ITask } from "./../types/index.d";

async function findTaskById(id: number) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    return task;
  } catch (error) {
    throw error;
  }
}

async function createTask(taskInfo: ITask) {
  try {
    const task = await prisma.task.create({
      data: {
        text: taskInfo.text,
        dueDate: taskInfo.dueDate,
        companyId: taskInfo.companyId,
      },
    });

    return task;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(id: number) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    return task;
  } catch (error) {
    throw error;
  }
}

export { findTaskById, createTask, deleteTask };
