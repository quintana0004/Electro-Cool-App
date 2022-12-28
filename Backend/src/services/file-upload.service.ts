import fs from "fs";
import util from "util";
import multer from "multer";
import { S3, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// --- Digital Ocean Spaces Client ---
const s3Client = new S3({
  forcePathStyle: false,
  endpoint: process.env.DO_SPACES_URL || "",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
});

const multerUploadMiddleware = multer({ dest: "uploads/" });
const deleteLocalServerFile = util.promisify(fs.unlink);

async function uploadFileToBucket(file: any) {
  try {
    const fileStream = fs.createReadStream(file.path);

    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Body: fileStream,
        Key: file.filename,
        ACL: "public-read",
      })
    );

    await deleteLocalServerFile(file.path);

    return { result: data, fileName: file.filename };
  } catch (error) {
    throw error;
  }
}

async function deleteFileFromBucket(fileName: string) {
  try {
    const data = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: fileName,
      })
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteFileFromLocalServer(filePath: string | undefined) {
  try {
    if (filePath) {
      await deleteLocalServerFile(filePath);
    }

    return;
  } catch (error) {
    throw error;
  }
}

export {
  multerUploadMiddleware,
  uploadFileToBucket,
  deleteFileFromBucket,
  deleteFileFromLocalServer,
};
