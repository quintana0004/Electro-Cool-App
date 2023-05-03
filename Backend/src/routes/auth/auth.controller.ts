import { Request, Response } from "express";
import {
  createUser,
  findUserByEmailOrUserName,
  findUserByToken,
  isUserAuthorized,
  updateUserTokens,
} from "../../models/users.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/auth.service";
import { IUser } from "../../types";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import { hasRequiredUserFields } from "../../utils/validators.utils";

async function httpLogin(req: Request, res: Response) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };

    if (
      (!userInfo.username && !userInfo.password) ||
      (!userInfo.email && !userInfo.password)
    ) {
      return handleBadResponse(
        400,
        "User requires username or email and a password to login into the system.",
        res
      );
    }

    const userResponse = await isUserAuthorized(
      userInfo.email,
      userInfo.username,
      userInfo.password
    );
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    const accessToken = generateAccessToken(
      userResponse.id,
      userResponse.companyId
    );
    await updateUserTokens(userResponse.id, accessToken);

    const user = await findUserByToken(accessToken);
    return res.status(200).json({
      accessToken: user?.accessToken,
      refreshToken: user?.refreshToken,
      email: userResponse.email,
      role: userResponse.role,
      accessState: userResponse.accessState,
      companyId: user?.companyId,
    });
  } catch (error) {
    return handleExceptionErrorResponse("login", error, res);
  }
}

async function httpSignUp(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      username: req.body.username,
    };

    const hasRequiredFields = hasRequiredUserFields(userInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to signup. Please provide the following fields: email, password, firstName, lastName, phone and username.",
        res
      );
    }

    const doesUserAlreadyExist = await findUserByEmailOrUserName(
      userInfo.email,
      userInfo.username
    );
    if (doesUserAlreadyExist) {
      return handleBadResponse(
        400,
        "A user with this username or email already exist.",
        res
      );
    }

    const user = await createUser(userInfo);

    const accessToken = generateAccessToken(user.id, user.companyId);
    const refreshToken = generateRefreshToken(user.id, user.companyId);
    await updateUserTokens(user.id, accessToken, refreshToken);

    return res.status(200).json({
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      accessState: user.accessState,
      accessToken: accessToken,
      refreshToken: refreshToken,
      companyId: user.companyId,
    });
  } catch (error) {
    return handleExceptionErrorResponse("singup", error, res);
  }
}

export { httpLogin, httpSignUp };
