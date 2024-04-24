import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/AppError';
import sharp from 'sharp';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs/promises';
import Logger from '../utils/Logger';

interface UploadedFiles {
  [keys: string]: Express.Multer.File[];
}

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true); // Accept the file
  } else {
    callback(new AppError('Not an image! Please upload only images.', 400)); // Reject the file
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
});

const createDirName = (req: Request): string => {
  let folderName = '';

  const urlSegments = req.originalUrl.split('/').at(-1) || req.originalUrl.split('/').at(-2);

  // Check if the last segment is a valid MongoDB ObjectId
  if (urlSegments?.length === 24 && /^[0-9a-fA-F]{24}$/.test(urlSegments)) {
    // If valid, use the second-to-last segment as folder name
    folderName = req.originalUrl.split('/').at(-2)?.toUpperCase() as string;
  } else {
    // Otherwise, use the last segment as folder name
    folderName = urlSegments?.toUpperCase() as string;
  }

  return folderName;
};

const createDir = async (directoryPath: string) => {
  try {
    // Check if the directory already exists
    await fs.access(directoryPath);
    Logger.info(`Directory already exists: ${directoryPath}`);
  } catch (accessError) {
    // Directory doesn't exist, attempt to create it
    try {
      await fs.mkdir(directoryPath, { recursive: true });
      Logger.info(`Directory created: ${directoryPath}`);
    } catch (mkdirError) {
      Logger.error(`Error creating directory: ${directoryPath}`);
      Logger.error(mkdirError);
    }
  }
};

async function rmOldImg(folderName: string, imgName: string) {
  const oldImgPath = `uploads/${folderName}/${imgName}`;

  // Check if the old image exists
  await fs.access(oldImgPath);
  // Remove the old image
  await fs.rm(oldImgPath);

  Logger.info(`Old image removed: ${oldImgPath}`);
}

export const uploadSingleImg = (fieldName: string) => upload.single(fieldName);

export const resizeSingleImg = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  // 1) Create the Directory's Name that will store images inside it
  const folderName = createDirName(req);

  // 2) Create the Directory if not exist
  await createDir(`${__dirname}/../../uploads/${folderName}`);

  // 3) Create Img name
  req.file.filename = `${folderName}_${Date.now().toString(36) + Math.random().toString(36).substring(2)}_${new Date().toISOString().slice(2, 19).replace('T', '_')}.jpeg`; // probability of collision (i.e., generating the same ID) depends on the method and the context in which it's used

  // Remove the old img when updating
  if (req.method === 'PATCH' && req.body[req.file.fieldname] !== 'undefined') {
    // Check if the old image's filename is provided in the request body
    if (!req.body[req.file.fieldname]) {
      return next(new AppError(`Please provide the filename of the old image in the request body to remove it first.`, 400));
    }

    try {
      await rmOldImg(folderName, req.body[req.file.fieldname]);
    } catch (error) {
      return next(new AppError(`Old image not found. Please provide the correct image filename.`, 400));
    }
  }

  // 5) Img Processing and Storing
  await sharp(req.file.buffer)
    .resize(1000, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/${folderName}/${req.file.filename}`);

  // 6) store the image's name into DB
  req.body[req.file.fieldname] = req.file.filename;

  next();
});

/* 
when it's one       => upload.single('')
when it's multiple  => upload.array('')
when it's mix       => upload.fields([{},{}])
*/

// MUST BE uploadImgs([{ name: 'imageCover' }, { name: 'images' }])
export const uploadImgs = (arrayOfFields: { name: string; maxCount: number }[]) => upload.fields(arrayOfFields);

async function saveImg(files: UploadedFiles, folderName: string, imgName: string) {
  await sharp(files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/${folderName}/${imgName}`);
}

export const resizeImgs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) return next();

  const files = req.files as UploadedFiles; // Type assertion

  // Get Dir's Name
  const folderName = createDirName(req);

  if (req.method === 'POST') {
    if (!files.imageCover) return next(new AppError(`imageCover is required`, 400));
    if (!files.images) return next(new AppError(`images is required`, 400));

    // Create the Directory if not exist
    await createDir(`${__dirname}/../../uploads/${folderName}`);

    // 1) Cover image
    req.body.imageCover = `${folderName}-${Date.now().toString(36) + Math.random().toString(36).substring(2)}-cover.jpeg`;
    await saveImg(files, folderName, req.body.imageCover);

    // 2) Images
    req.body.images = [];
    await Promise.all(
      files.images.map(async (file, i) => {
        const filename = `${folderName}-${Date.now().toString(36) + Math.random().toString(36).substring(2)}-img${i + 1}.jpeg`;

        await sharp(file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`uploads/${folderName}/${filename}`);

        req.body.images.push(filename);
      }),
    );
  }

  if (req.method === 'PATCH') {
    // 1) imageCover
    if (files.imageCover) {
      // Check if the old imageCover is provided in the request body
      if (!req.body.imageCover) {
        return next(new AppError(`Please provide the imageCover of the old image in the request body to remove it first.`, 400));
      }

      try {
        await rmOldImg(folderName, req.body.imageCover);
      } catch (error) {
        // Handle error if the old image is not found
        return next(new AppError(`Old image not found. Please provide the correct image filename.`, 400));
      }

      req.body.imageCover = `${folderName}-${Date.now().toString(36) + Math.random().toString(36).substring(2)}-cover.jpeg`;
      await saveImg(files, folderName, req.body.imageCover);
    }

    // 2) images
    if (files.images) {
      // Check if the old images names is provided in the request body
      if (!req.body.images) {
        return next(new AppError(`Please provide the old images name in the request body to remove them first.`, 400));
      }
      if (!Array.isArray(req.body.images)) {
        return next(new AppError(`old image names Must be an Array`, 400));
      }

      // Check if all img names are correct
      try {
        await Promise.all(
          req.body.images.map(async (img: string) => {
            try {
              await fs.access(`uploads/${folderName}/${img}`);
            } catch (error) {
              throw new AppError(`img: ${img} not found`, 400);
            }
          }),
        );
      } catch (error) {
        return next(error);
      }

      // Remove all imgs that need to be updated
      req.body.images.forEach(async (img: string) => await fs.rm(`uploads/${folderName}/${img}`));

      // save the new imgs
      req.body.images = [];
      await Promise.all(
        files.images.map(async (file, i) => {
          const filename = `${folderName}-${Date.now().toString(36) + Math.random().toString(36).substring(2)}-img${i + 1}.jpeg`;

          await sharp(file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`uploads/${folderName}/${filename}`);

          req.body.images.push(filename);
        }),
      );
    }
  }

  next();
});
