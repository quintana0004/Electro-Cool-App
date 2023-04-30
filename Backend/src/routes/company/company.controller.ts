import { Request, Response } from "express";
import { createCompany, findCompanyById } from "../../models/company.model";
import { ICompany } from "../../types";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import { formatPhoneNumber } from "../../utils/formatters.utils";
import { isValidPhoneNumber } from "../../utils/validators.utils";

async function httpGetCompany(req: Request, res: Response) {
  try {
    const companyId = req.params.id;

    const company = await findCompanyById(companyId);
    if (company == null) {
      return handleBadResponse(
        404,
        "Couldn't find a company with the provided Id. Please provide another Id.",
        res
      );
    }

    res.status(200).json(company);
  } catch (error) {
    return handleExceptionErrorResponse("get company", error, res);
  }
}

async function httpCreateCompany(req: Request, res: Response) {
  try {
    const companyInfo: ICompany = {
      name: req.body.name,
      businessType: req.body.businessType,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      zipcode: req.body.zipcode,
      email: req.body.email,
      phone: formatPhoneNumber(req.body.phone),
    };

    if (
      !companyInfo.name ||
      !companyInfo.businessType ||
      !companyInfo.addressLine1 ||
      !companyInfo.country ||
      !companyInfo.zipcode
    ) {
      return handleBadResponse(
        400,
        "Missing required fields to create company. Please assure you provide the following field: name, businessType, addressLine1, country and zipcode.",
        res
      );
    }

    const isPhoneNumberFormatValid = isValidPhoneNumber(companyInfo.phone);
    if (!isPhoneNumberFormatValid) {
      return handleBadResponse(
        400,
        "The phone number provided is not valid. Please provide a phone number with 10 digits.",
        res
      );
    }

    const createdCompany = await createCompany(companyInfo);
    return res.status(200).json(createdCompany);
  } catch (error) {
    return handleExceptionErrorResponse("create company", error, res);
  }
}

export { httpGetCompany, httpCreateCompany };
