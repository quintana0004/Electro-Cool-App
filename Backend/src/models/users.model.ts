import prisma from "../database/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  getUserIdFromToken,
} from "../services/auth.service";
import {
  excludeFields,
  generateExpirationDate,
  generateRandomString,
  generateSalt,
  sha512,
} from "../utils/db.utils";
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
        companyId: String(company?.id),
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserByEmailOrUserName(email?: string, username?: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserByName(name?: string) {
  try {
    const term = name ?? "";
    const nameSearch = term ? term : undefined;

    const users = await prisma.user.findMany({
      where: {
        fullName: {
          contains: nameSearch,
          mode: "insensitive",
        },
      },
    });

    const usersFiltered = users.map((user) =>
      excludeFields(
        user,
        "password",
        "passwordSalt",
        "accessToken",
        "refreshToken"
      )
    );
    return usersFiltered;
  } catch (error) {
    throw error;
  }
}

async function findUserByToken(token: string) {
  try {
    const userId = getUserIdFromToken(token);

    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getUserTokens(token: string) {
  try {
    const userId = getUserIdFromToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    throw error;
  }
}

async function isUserAuthorized(
  email: string,
  username: string,
  password: string
) {
  try {
    const user = await findUserByEmailOrUserName(email, username);
    if (!user) {
      return buildErrorObject(
        401,
        "A user doesn't exist with this email nor username."
      );
    }

    let hashedPasswordFromRequest = sha512(password, user.passwordSalt);

    let hashedTemporaryPasswordFromRequest = sha512(
      password,
      user.temporaryPasswordSalt ?? ""
    );
    if (
      hashedPasswordFromRequest !== user.password &&
      hashedTemporaryPasswordFromRequest !== user.temporaryPassword
    ) {
      return buildErrorObject(
        401,
        "Provided password is incorrect for this user."
      );
    }

    if (user.accessState != "Active") {
      return buildErrorObject(
        400,
        "User does not have approval to access the system."
      );
    }

    const userWithoutPassord = excludeFields(user, "password", "passwordSalt");
    return userWithoutPassord;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userInfo: IUser) {
  try {
    let fullName = undefined;
    if (!!userInfo.firstName && !!userInfo.lastName) {
      fullName = userInfo.firstName + " " + userInfo.lastName;
    }

    let updatedUserCredentials = undefined;
    if (!!userInfo.password) {
      updatedUserCredentials = await updateUserCredentials(
        userInfo.id ?? "",
        userInfo.companyId ?? "",
        userInfo.password
      );
    }

    const user = await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: {
        fullName: fullName,
        firstName: !!userInfo.firstName ? userInfo.firstName : undefined,
        lastName: !!userInfo.lastName ? userInfo.lastName : undefined,
        phone: !!userInfo.phone ? userInfo.phone : undefined,
        email: !!userInfo.email ? userInfo.email : undefined,
        username: !!userInfo.username ? userInfo.username : undefined,
      },
    });

    const mergedUserUpdate = {
      ...user,
      accessToken: updatedUserCredentials?.accessToken,
      refreshToken: updatedUserCredentials?.refreshToken,
    };
    return excludeFields(mergedUserUpdate, "id", "password", "passwordSalt");
  } catch (error) {
    throw error;
  }
}

async function updateUserTokens(
  userId: string,
  accessToken: string,
  refreshToken?: string
) {
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

async function updateUserAccess(
  userId: string,
  role: string,
  approval: string,
  startDate?: string,
  endDate?: string
) {
  try {
    // Update the user approval to Active if it's within the time range.
    if (startDate && endDate) {
      let requestDateTime = new Date();
      let startDateTime = new Date(startDate);
      let endDateTime = new Date(endDate);

      approval =
        requestDateTime >= startDateTime && requestDateTime <= endDateTime
          ? "Active"
          : approval;
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accessState: approval,
        role: role,
        accessStartDate: startDate,
        accessEndDate: endDate,
      },
    });

    return excludeFields(
      user,
      "password",
      "passwordSalt",
      "accessToken",
      "refreshToken"
    );
  } catch (error) {
    throw error;
  }
}

async function updateUserState(id: string, accessState: string) {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        accessState: accessState,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateTemporaryAdminsByStartDate() {
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            role: "Temp. Admin",
          },
          {
            accessState: "Pending",
          },
          {
            accessStartDate: {
              lte: new Date(),
            },
          },
        ],
      },
    });

    const tempAdminsIds = users.map((user) => user.id);
    const updatedUsers = await prisma.user.updateMany({
      where: {
        id: {
          in: tempAdminsIds,
        },
      },
      data: {
        accessState: "Active",
      },
    });

    return updatedUsers;
  } catch (error) {
    throw error;
  }
}

async function updateTemporaryAdminsByEndDate() {
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            role: "Temp. Admin",
          },
          {
            accessState: "Active",
          },
          {
            accessEndDate: {
              lte: new Date(),
            },
          },
        ],
      },
    });

    const tempAdminsIds = users.map((user) => user.id);
    const updatedUsers = await prisma.user.updateMany({
      where: {
        id: {
          in: tempAdminsIds,
        },
      },
      data: {
        accessState: "Inactive",
      },
    });

    return updatedUsers;
  } catch (error) {
    throw error;
  }
}

async function updateUserTemporaryPassword(id: string) {
  try {
    const password = generateRandomString(12);
    const passwordSalt = generateSalt(32);
    const temporaryHashedPassword = sha512(password, passwordSalt);
    const passwordExpirationDate = generateExpirationDate(24);

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        temporaryPassword: temporaryHashedPassword,
        temporaryPasswordSalt: passwordSalt,
        temporaryPasswordExpiration: passwordExpirationDate,
      },
    });

    return { user, password };
  } catch (error) {
    throw error;
  }
}

async function updateUserCredentials(
  id: string,
  companyId: string,
  newPassword: string
) {
  try {
    const passwordSalt = generateSalt(32);
    const hashedPassword = sha512(newPassword, passwordSalt);
    const accessToken = generateAccessToken(id, companyId);
    const refreshToken = generateRefreshToken(id, companyId);

    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
        passwordSalt: passwordSalt,
        accessToken: accessToken,
        refreshToken: refreshToken,
        temporaryPassword: null,
        temporaryPasswordSalt: null,
        temporaryPasswordExpiration: null,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateUsersExpiredPasswords() {
  try {
    const TODAY = new Date();
    const user = await prisma.user.updateMany({
      where: {
        temporaryPasswordExpiration: {
          lt: TODAY,
        },
      },
      data: {
        temporaryPassword: null,
        temporaryPasswordSalt: null,
        temporaryPasswordExpiration: null,
      },
    });
  } catch (error) {
    throw error;
  }
}
async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export {
  createUser,
  findUserById,
  findUserByEmailOrUserName,
  findUserByName,
  findUserByToken,
  getUserTokens,
  isUserAuthorized,
  updateUser,
  updateUserTokens,
  updateUserAccess,
  updateUserState,
  updateTemporaryAdminsByStartDate,
  updateTemporaryAdminsByEndDate,
  updateUserTemporaryPassword,
  updateUsersExpiredPasswords,
  deleteUser,
};
