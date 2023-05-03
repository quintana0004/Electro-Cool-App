import { Request, Response } from "express";
import {
  deleteUser,
  findUserByEmailOrUserName,
  findUserByName,
  updateUser,
  updateUserAccessState,
} from "../../models/users.model";
import { IUser } from "../../types";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import {
  isIsoDate,
  isValidPhoneNumber,
  isValidUserId,
} from "../../utils/validators.utils";
import { formatName, formatPhoneNumber } from "../../utils/formatters.utils";

async function httpGetAllUsers(req: Request, res: Response) {
  try {
    let searchTerm = req.query.searchTerm
      ? req.query.searchTerm.toString()
      : undefined;

    const users = await findUserByName(searchTerm);
    return res.json(users);
  } catch (error) {
    return handleExceptionErrorResponse("get all users", error, res);
  }
}

async function httpUpdateUserProfile(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      id: req.userId,
      firstName: formatName(req.body.firstName),
      lastName: formatName(req.body.lastName),
      phone: formatPhoneNumber(req.body.phone),
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const isUserIdValid = await isValidUserId(req.userId);
    if (!isUserIdValid) {
      return handleBadResponse(
        400,
        "The user Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const doesEmailAlreadyExist = await findUserByEmailOrUserName(
      userInfo.email
    );
    if (doesEmailAlreadyExist && doesEmailAlreadyExist.id != userInfo.id) {
      return handleBadResponse(
        400,
        "Another user with this email already exist.",
        res
      );
    }

    const doesUserNameAlreadyExist = await findUserByEmailOrUserName(
      undefined,
      userInfo.username
    );
    if (
      doesUserNameAlreadyExist &&
      doesUserNameAlreadyExist.id != userInfo.id
    ) {
      return handleBadResponse(
        400,
        "Another user with this username already exist.",
        res
      );
    }

    const isPhoneNumberFormatValid = isValidPhoneNumber(userInfo.phone);
    if (!isPhoneNumberFormatValid) {
      return handleBadResponse(
        400,
        "The phone number provided is not valid. Please provide a phone number with 10 digits.",
        res
      );
    }

    const user = await updateUser(userInfo);
    return res.status(200).json(user);
  } catch (error) {
    return handleExceptionErrorResponse("update user profile", error, res);
  }
}

async function httpUpdateUserAccess(req: Request, res: Response) {
  try {
    const userInfo = {
      userId: req.body.userId,
      role: req.body.role,
      accessState: req.body.accessState,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

    if (!userInfo.userId || !userInfo.role || !userInfo.accessState) {
      return handleBadResponse(
        400,
        "Missing required fields to update user state. Please provide the following fields: userId, role and accessState.",
        res
      );
    }

    const isUserIdValid = await isValidUserId(userInfo.userId);
    if (!isUserIdValid) {
      return handleBadResponse(
        400,
        "The user Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isStartDateFormatValid = isIsoDate(userInfo.startDate);
    if (!isStartDateFormatValid && !!userInfo.startDate) {
      return handleBadResponse(
        400,
        `The date provided for the Start Date Time is not valid. The correct format must be in ISO as the following: "YYYY-MM-DDTHH:MN:SS.MSSZ".`,
        res
      );
    }

    const isEndDateFormatValid = isIsoDate(userInfo.endDate);
    if (!isEndDateFormatValid && !!userInfo.endDate) {
      return handleBadResponse(
        400,
        `The date provided for the End Date Time is not valid. The correct format must be in ISO as the following: "YYYY-MM-DDTHH:MN:SS.MSSZ".`,
        res
      );
    }

    const user = await updateUserAccessState(
      userInfo.userId,
      userInfo.role,
      userInfo.accessState,
      userInfo.startDate,
      userInfo.endDate
    );

    return res.json(user);
  } catch (error) {
    return handleExceptionErrorResponse("update user approval", error, res);
  }
}

async function httpDeleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    const isUserIdValid = await isValidUserId(userId);
    if (!isUserIdValid) {
      return handleBadResponse(
        400,
        "The user Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const deletedUser = await deleteUser(userId);
    return res.json(deletedUser);
  } catch (error) {
    return handleExceptionErrorResponse("delete user", error, res);
  }
}

export {
  httpGetAllUsers,
  httpUpdateUserProfile,
  httpUpdateUserAccess,
  httpDeleteUser,
};
