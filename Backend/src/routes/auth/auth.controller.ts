import { Request, Response } from "express";
import {
  createUser,
  findUserByEmailOrUserName,
  findUserById,
  findUserByToken,
  getUserTokens,
  isUserAuthorized,
  updateUserCredentials,
  updateUserTemporaryPassword,
  updateUserTokens,
} from "../../models/users.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../services/auth.service";
import { sendTemporaryPasswordEmail } from "../../services/mail.service";
import { IUser } from "../../types";
import { sha512 } from "../../utils/db.utils";
import {
  buildErrorObject,
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
      (!userInfo.username && !userInfo.email) ||
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

async function httpRefreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      const error = buildErrorObject(401, "Token was not provided.");
      return res.status(error.errorCode).json({ error: error });
    }

    const userRefreshToken = await getUserTokens(refreshToken);
    if (!userRefreshToken || refreshToken !== userRefreshToken.refreshToken) {
      const error = buildErrorObject(401, "Token is not valid for this users.");
      return res.status(error.errorCode).json({ error: error });
    }

    const verifyTokenResponse = verifyRefreshToken(refreshToken);
    if ("errorCode" in verifyTokenResponse) {
      return res.status(verifyTokenResponse.errorCode).json({
        error: verifyTokenResponse,
      });
    }

    const [accessToken, refreshedToken] = verifyTokenResponse;
    await updateUserTokens(userRefreshToken.id, accessToken, refreshedToken);

    return res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshedToken });
  } catch (error) {
    return handleExceptionErrorResponse("refresh token", error, res);
  }
}

async function httpRequestTemporaryPassword(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const email = req.body.username; // Username could be the email when coming from the frontend

    const user = await findUserByEmailOrUserName(username, email);
    if (user === null) {
      return handleBadResponse(
        400,
        "A user with this username or email does not exist.",
        res
      );
    }

    const { user: updatedUser, password } = await updateUserTemporaryPassword(
      user.id
    );
    await sendTemporaryPasswordEmail(updatedUser.email, password);

    return res.status(200).json("Temporary password has been sent");
  } catch (error) {
    return handleExceptionErrorResponse(
      "request temporary password",
      error,
      res
    );
  }
}

async function httpResetPassword(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await findUserById(userId);
    if (user === null) {
      return handleBadResponse(
        400,
        "A user with this access token does not exist.",
        res
      );
    }

    const hashedOldPassword = sha512(oldPassword, user.passwordSalt);
    const hashedTemporaryPassword = sha512(
      oldPassword,
      user.temporaryPasswordSalt ?? ""
    );
    if (
      hashedOldPassword !== user.password &&
      hashedTemporaryPassword !== user.temporaryPassword
    ) {
      return handleBadResponse(
        400,
        "The old password for this user those not match the provided password.",
        res
      );
    }

    const accessToken = generateAccessToken(user.id, user.companyId);
    const refreshToken = generateRefreshToken(user.id, user.companyId);
    const updatedUser = await updateUserCredentials(
      user.id,
      newPassword,
      accessToken,
      refreshToken
    );

    return res.status(200).json({
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      phone: updatedUser.phone,
      email: updatedUser.email,
      accessToken: updatedUser.accessToken,
      refreshToken: updatedUser.refreshToken,
      accessState: updatedUser.accessState,
      role: updatedUser.role,
    });
  } catch (error) {
    return handleExceptionErrorResponse("reset password", error, res);
  }
}

export {
  httpLogin,
  httpSignUp,
  httpRefreshToken,
  httpRequestTemporaryPassword,
  httpResetPassword,
};
