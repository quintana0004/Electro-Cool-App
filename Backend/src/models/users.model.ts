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
        OR: [{ email: email }, { username: username }],
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserByName(name?: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        fullName: {
          contains: name,
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
    if (hashedPasswordFromRequest !== user.password) {
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

    let salt = undefined;
    let hashedPassword = undefined;
    if (!!userInfo.password) {
      salt = generateSalt(32);
      hashedPassword = sha512(userInfo.password, salt);
    }

    const user = await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: {
        fullName: fullName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        email: userInfo.email,
        username: userInfo.username,
        password: hashedPassword,
        passwordSalt: salt,
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

async function updateUserAccessState(
  userId: string,
  role: string,
  approval: string,
  startDate?: string,
  endDate?: string
) {
  try {
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
  updateUserAccessState,
  updateTemporaryAdminsByStartDate,
  updateTemporaryAdminsByEndDate,
  deleteUser,
};
