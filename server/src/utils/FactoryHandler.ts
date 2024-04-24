import { Model } from 'mongoose';
import { catchAsync } from './catchAsync';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import AppError from './AppError';
import APIFeatures from './APIFeatures';

interface Request extends ExpressRequest {
  filterObj?: { category_id?: string };
}

interface Options {
  populate?: { path: string; select?: string };
  filters?: { reqBodyField: string; reqParamField: string }[];
}

class Factory {
  static createOne<T>(Model: Model<T>) {
    return catchAsync(async (req: Request, res: Response) => {
      const newDoc = await Model.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          [Model.collection.collectionName.slice(0, -1)]: newDoc,
        },
      });
    });
  }

  static getOne<T>(Model: Model<T>, populateOptions?: { path: string; select?: string }) {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const query = Model.findById(req.params.id).select('-__v -createdAt -updatedAt');
      if (populateOptions) {
        query.populate(populateOptions);
      }
      const foundModel = await query;

      if (!foundModel) {
        return next(new AppError(`No ${Model.collection.collectionName.slice(0, -1)} found with this id`, 404));
      }

      res.json({
        status: 'success',
        data: {
          [Model.collection.collectionName.slice(0, -1)]: foundModel,
        },
      });
    });
  }

  static getAll<T>(Model: Model<T>, options?: Options) {
    return catchAsync(async (req: Request, res: Response) => {
      // To allow nested GET All Children on Parent
      let filter = {};
      if (options?.filters) {
        options.filters.forEach((f) => {
          // ONLY one filter would be attached to request
          if (req.params[f.reqParamField]) {
            filter = { [f.reqBodyField]: req.params[f.reqParamField] };
          }
        });
      }

      // Base QUERY
      const query = Model.find(filter);

      // Add more Features for Query
      const features = new APIFeatures(query, req.query).filter().sort().project().paginate();

      // Populate if any
      if (options?.populate) {
        query.populate(options.populate);
      }

      // EXECUTE QUERY
      const docs = await features.queryExec;

      // Execute count query
      const totalCount = await Model.estimatedDocumentCount(); // O(1) but not always accurate

      // SEND RESPONSE
      res.json({
        status: 'success',
        results: docs.length,
        total: totalCount,
        data: {
          [Model.collection.collectionName]: docs,
        },
      });
    });
  }

  static updateOne<T>(Model: Model<T>) {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError(`No ${Model.collection.collectionName.slice(0, -1)} found with this id`, 404));
      }

      res.json({
        status: 'success',
        data: {
          [Model.collection.collectionName.slice(0, -1)]: doc,
        },
      });
    });
  }

  static deleteOne<T>(Model: Model<T>) {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const deletedModel = await Model.findOneAndDelete({ _id: req.params.id });

      if (!deletedModel) {
        return next(new AppError(`No ${Model.collection.collectionName.slice(0, -1)} found with this id`, 404));
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    });
  }
}

export default Factory;
