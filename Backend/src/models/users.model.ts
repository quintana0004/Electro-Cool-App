import prisma from "../database/prisma";
import { getUserIdFromToken } from "../services/auth.service";
import { excludeFields, generateSalt, sha512 } from "../utils/db.utils";
import { buildErrorObject } from "../utils/errors.utils";
import { IUser } from "./../types/index.d";
import { findCompanyByName } from "./company.model";

async function createUser(userInfo: IUser) {
  try {
    let salt = generateSalt(32);
    let hashedPassword = sha512(userInfo.password, salt);
    // ONLY TEMPORARELY FOR MVP ->
    let company = await findCompanyByName("Electro Cool");

    const user = await prisma.user.create({
      data: {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
        phone: userInfo.phone,
        email: userInfo.email,
        username: userInfo.username,
        password: hashedPassword,
        passwordSalt: salt,
        isApproved: userInfo.isApproved,
        companyId: String(company?.id),
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserByEmailOrUserName(email: string, username: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserByName(name: string | undefined) {
  try {
    const users = await prisma.user.findMany({
      where: {
        fullName: {
          contains: name,
        },
      },
    });

    const usersFiltered = users.map((user) =>
      excludeFields(user, "password", "passwordSalt", "accessToken", "refreshToken")
    );
    return usersFiltered;
  } catch (error) {
    throw error;
  }
}

async function findUserByToken(token: string) {
  try {
    const userId = getUserIdFromToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserTokens(userId: string, accessToken: string, refreshToken?: string) {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    const userFiltered = excludeFields(user, "id", "password", "passwordSalt");
    return userFiltered;
  } catch (error) {
    throw error;
  }
}

async function isUserAuthorized(email: string, username: string, password: string) {
  try {
    const user = await findUserByEmailOrUserName(email, username);
    if (!user) {
      return buildErrorObject(401, "A user doesn't exist with this email nor username.");
    }

    let hashedPasswordFromRequest = sha512(password, user.passwordSalt);
    if (hashedPasswordFromRequest !== user.password) {
      return buildErrorObject(401, "Provided password is incorrect for this user.");
    }

    if (!user.isApproved) {
      return buildErrorObject(400, "User does not have approval to access the system.");
    }

    const userWithoutPassord = excludeFields(user, "password", "passwordSalt");
    return userWithoutPassord;
  } catch (error) {
    throw error;
  }
}

export {
  createUser,
  findUserByEmailOrUserName,
  findUserByName,
  findUserByToken,
  isUserAuthorized,
  updateUserTokens,
};
