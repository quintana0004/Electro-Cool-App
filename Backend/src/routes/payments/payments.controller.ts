import { Request, Response } from "express";
import {
  findPaymentById,
  upsertATHMovilPayment,
  upsertCardPayment,
  upsertCashPayment,
  upsertCheckPayment,
} from "../../models/payments.model";
import { deleteFileFromLocalServer, uploadFileToBucket } from "../../services/file-upload.service";
import { IPayment } from "../../types";
import { getDummyCompanyId } from "../../utils/db.utils";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import {
  hasRequiredATHMovilPaymentFields,
  hasRequiredCardPaymentFields,
  hasRequiredCashPaymentFields,
  hasRequiredCheckPaymentFields,
  isValidCompanyId,
  isValidInvoiceId,
  isValidPaymentId,
} from "../../utils/validators.utils";

async function httpGetAllPayments(req: Request, res: Response) {
  try {
    return res.status(200).json("Get All Payments");
  } catch (error) {
    return handleExceptionErrorResponse("get all payments", error, res);
  }
}

async function httpGetPaymentById(req: Request, res: Response) {
  try {

    const paymentId = req.params.id;

    let isPaymentIdValid = await isValidPaymentId(paymentId);
    if (!isPaymentIdValid) {
      return handleBadResponse(
        400,
        "The payment Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const payment = await findPaymentById(+paymentId);
    return res.status(200).json(payment);
  } catch (error) {
    return handleExceptionErrorResponse("get payment by id", error, res);
  }
}

async function httpUpsertCardPayment(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const athEvidenceFile = req.file;
    const athEvidenceFilePath = req.file?.path;
    const paymentInfo: IPayment = {
      id: req.body.id,
      type: req.body.type,
      athEvidence: "",
      companyId: companyId,
      invoiceId: req.body.invoiceId,
    };

    // 1. Validate Required Fields
    let hasRequiredCardFields = hasRequiredCardPaymentFields(paymentInfo, athEvidenceFile);
    if (!hasRequiredCardFields) {
      handleBadResponse(
        400,
        "Missing required fields to create/update payment. Please provide the following fields: type, invoiceId and athEvidence. Additionally assure that your numeric ids are in number format.",
        res
      );

      return await deleteFileFromLocalServer(athEvidenceFilePath);
    }

    // 2. Validate Invoice Id
    let isInvoiceIdValid = await isValidInvoiceId(paymentInfo.invoiceId);
    if (!isInvoiceIdValid) {
      handleBadResponse(
        400,
        "The invoice Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      return await deleteFileFromLocalServer(athEvidenceFilePath);
    }

    // 3. Validate Company Id
    let isCompanyIdValid = await isValidCompanyId(String(paymentInfo.companyId));
    if (!isCompanyIdValid) {
      handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      return await deleteFileFromLocalServer(athEvidenceFilePath);
    }

    // 4. Upload File
    const { fileName } = await uploadFileToBucket(athEvidenceFile);
    paymentInfo.athEvidence = fileName;

    // 5. Upsert Card Payment
    const cardPayment = await upsertCardPayment(paymentInfo);
    return res.status(200).json(cardPayment);
  } catch (error) {
    return handleExceptionErrorResponse("upsert card payment", error, res);
  }
}

async function httpUpsertCheckPayment(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    // Ignored types because multer does not provide types when dealing with multiple files
    // @ts-ignore
    const bankFrontImageFile = req.files["checkFrontImage"] ? req.files["checkFrontImage"][0] : null;
    // @ts-ignore
    const bankBackImageFile = req.files["checkBackImage"] ? req.files["checkBackImage"][0] : null;

    const paymentInfo: IPayment = {
      id: req.body.id,
      type: req.body.type,
      bankStatus: req.body.bankStatus,
      bankFrontEvidence: req.body.bankFrontEvidence,
      bankBackEvidence: req.body.bankBackEvidence,
      companyId: companyId,
      invoiceId: req.body.invoiceId,
    };

    // 1. Validate Required Fields
    let hasRequiredCheckFields = hasRequiredCheckPaymentFields(
      paymentInfo,
      bankFrontImageFile,
      bankBackImageFile
    );
    if (!hasRequiredCheckFields) {
      handleBadResponse(
        400,
        "Missing required fields to create/update payment. Please provide the following fields: type, bankStatus, bankFrontEvidence, bankBackEvidence and invoiceId. Additionally assure that your numeric ids are in number format.",
        res
      );

      await deleteFileFromLocalServer(bankFrontImageFile?.path);
      await deleteFileFromLocalServer(bankBackImageFile?.path);
      return;
    }

    // 2. Validate Invoice Id
    let isInvoiceIdValid = await isValidInvoiceId(paymentInfo.invoiceId);
    if (!isInvoiceIdValid) {
      handleBadResponse(
        400,
        "The invoice Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      await deleteFileFromLocalServer(bankFrontImageFile?.path);
      await deleteFileFromLocalServer(bankBackImageFile?.path);
      return;
    }

    // 3. Validate Company Id
    let isCompanyIdValid = await isValidCompanyId(String(paymentInfo.companyId));
    if (!isCompanyIdValid) {
      handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      await deleteFileFromLocalServer(bankFrontImageFile?.path);
      await deleteFileFromLocalServer(bankBackImageFile?.path);
      return;
    }

    // 4. Upload Files to Digital Ocean Spaces
    const { fileName: bankFrontFileName } = await uploadFileToBucket(bankFrontImageFile);
    const { fileName: bankBackFileName } = await uploadFileToBucket(bankBackImageFile);
    paymentInfo.bankFrontEvidence = bankFrontFileName;
    paymentInfo.bankBackEvidence = bankBackFileName;

    // 5. Upsert Check Payment
    const checkPayment = await upsertCheckPayment(paymentInfo);
    return res.status(200).json(checkPayment);
  } catch (error) {
    return handleExceptionErrorResponse("upsert check payment", error, res);
  }
}

async function httpUpsertCashPayment(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const paymentInfo: IPayment = {
      id: req.body.id,
      type: req.body.type,
      amountPaid: req.body.amountPaid,
      companyId: companyId,
      invoiceId: req.body.invoiceId,
    };

    // 1. Validate Required Fields
    let hasRequiredCashFields = hasRequiredCashPaymentFields(paymentInfo);
    if (!hasRequiredCashFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update payment. Please provide the following fields: type, amountPaid and invoiceId. Additionally assure that your numeric ids are in number format.",
        res
      );
    }

    // 2. Validate Invoice Id
    let isInvoiceIdValid = await isValidInvoiceId(paymentInfo.invoiceId);
    if (!isInvoiceIdValid) {
      return handleBadResponse(
        400,
        "The invoice Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    // 3. Validate Company Id
    let isCompanyIdValid = await isValidCompanyId(String(paymentInfo.companyId));
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    // 4. Upsert Cash Payment
    const cashPayment = await upsertCashPayment(paymentInfo);
    return res.status(200).json(cashPayment);
  } catch (error) {
    return handleExceptionErrorResponse("upsert cash payment", error, res);
  }
}

async function httpUpsertATHMovilPayment(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const paymentInfo: IPayment = {
      id: req.body.id,
      type: req.body.type,
      referenceNumber: req.body.referenceNumber,
      companyId: companyId,
      invoiceId: req.body.invoiceId,
    };

    // 1. Validate Required Fields
    let hasRequiredATHMovilFields = hasRequiredATHMovilPaymentFields(paymentInfo);
    if (!hasRequiredATHMovilFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update payment. Please provide the following fields: type, referenceNumber and invoiceId. Additionally assure that your numeric ids are in number format.",
        res
      );
    }

    // 2. Validate Invoice Id
    let isInvoiceIdValid = await isValidInvoiceId(paymentInfo.invoiceId);
    if (!isInvoiceIdValid) {
      return handleBadResponse(
        400,
        "The invoice Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    // 3. Validate Company Id
    let isCompanyIdValid = await isValidCompanyId(String(paymentInfo.companyId));
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    // 4. Upsert ATH Movil Payment
    const athMovilPayment = await upsertATHMovilPayment(paymentInfo);
    return res.status(200).json(athMovilPayment);
  } catch (error) {
    return handleExceptionErrorResponse("upsert ath movil payment", error, res);
  }
}

export {
  httpGetAllPayments,
  httpGetPaymentById,
  httpUpsertCardPayment,
  httpUpsertCheckPayment,
  httpUpsertCashPayment,
  httpUpsertATHMovilPayment,
};
