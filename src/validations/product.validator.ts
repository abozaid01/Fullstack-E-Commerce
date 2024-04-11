import { body, param } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Category from '../models/category.model';
import SubCategory from '../models/subCategory.model';
import Brand from '../models/brand.model';
import Product from '../models/product.model';
import Logger from '../utils/Logger';

async function checkBrandExist(BrandId: string) {
  return Brand.findById(BrandId).then((brand) => {
    if (!brand) {
      return Promise.reject(new Error(`No brand found with this id: ${BrandId}`));
    }
  });
}

const checkTitleExist = async (title: string) => {
  return Product.findOne({ title }).then((product) => {
    if (product) {
      return Promise.reject(new Error(`product ${title} alerady exist`));
    }
  });
};

export const getAllProductsValidator = [
  param('brandId')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (brandId) => await checkBrandExist(brandId)),

  validatorMiddleware,
];

export const createProductValidator = [
  body('title')
    .notEmpty()
    .withMessage("Product's title is required")
    .isLength({ min: 3 })
    .withMessage('Too short, must be at least 3 chars')
    .isLength({ max: 32 })
    .withMessage('Too long product name, must be at most 23 chars')
    .custom(checkTitleExist),

  body('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Too long description')
    .isLength({ min: 20 })
    .withMessage('Too short description, must be at least 20 chars'),

  body('quantity').notEmpty().withMessage('Product quantity is required').isNumeric().withMessage('Product quantity must be a number'),

  // body('sold').optional().isNumeric().withMessage('Product quantity must be a number'),

  body('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),

  body('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),

  body('colors').optional().isArray().withMessage('available Colors should be array of string'),

  body('category_id')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error(`No category for this id: ${categoryId}`));
        }
      }),
    ),

  body('subcategories_ids')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (subcategoriesIds) => {
      subcategoriesIds = Array.isArray(subcategoriesIds) ? subcategoriesIds : [subcategoriesIds];

      return SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then((result) => {
        Logger.debug(subcategoriesIds);
        if (result.length < 1 || result.length !== subcategoriesIds.length) {
          return Promise.reject(new Error(`Invalid subcategories Ids`));
        }
      });
    })
    .custom((val, { req }) =>
      SubCategory.find({ category_id: req.body.category_id }).then((subcategories) => {
        // Get all subcategories belonging to this category_id in req.body
        const subCategoriesIdsInDB: string[] = [];
        subcategories.forEach((subCategory) => {
          subCategoriesIdsInDB.push(subCategory._id.toString());
        });
        // check if subcategories ids in db include subcategories in req.body (true)
        const checker = (target: string[], arr: string[]) => target.every((v) => arr.includes(v));
        if (!checker(Array.isArray(val) ? val : [val], subCategoriesIdsInDB)) {
          return Promise.reject(new Error(`subcategories not belong to category`));
        }
      }),
    ),

  body('brand_id')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (brandId) => await checkBrandExist(brandId)),

  param('brandId')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (brandId) => await checkBrandExist(brandId)),

  body('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),

  body('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,
];

export const updateProductValidator = [
  param('id').isMongoId().withMessage('Invalid ID format'),

  body('_id').custom((value, { req }) => {
    if (req.body._id) {
      throw new Error('Cannot update _id field');
    }
    return true;
  }),

  body('title')
    .optional()
    .notEmpty()
    .withMessage("Product's title is required")
    .isLength({ min: 3 })
    .withMessage('Too short, must be at least 3 chars')
    .isLength({ max: 32 })
    .withMessage('Too long brand name, must be at most 23 chars')
    .custom(checkTitleExist),

  body('description')
    .optional()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Too long description')
    .isLength({ min: 20 })
    .withMessage('Too short description, must be at least 20 chars'),

  body('quantity')
    .optional()
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),

  // body('sold').optional().isNumeric().withMessage('Product quantity must be a number'),

  body('price')
    .optional()
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),

  body('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),

  body('colors').optional().isArray().withMessage('available Colors should be array of string'),

  // body('imageCover').notEmpty().withMessage('Product imageCover is required'),

  body('images').optional().isArray().withMessage('images should be array of string'),

  body('category_id')
    .optional()
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error(`No category for this id: ${categoryId}`));
        }
      }),
    ),

  body('subcategories_ids')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then((result) => {
        if (result.length < 1 || result.length !== subcategoriesIds.length) {
          return Promise.reject(new Error(`Invalid subcategories Ids`));
        }
      }),
    )
    .custom((val, { req }) =>
      SubCategory.find({ category_id: req.body.category_id }).then((subcategories) => {
        // Get all subcategories belonging to this category_id in req.body
        const subCategoriesIdsInDB: string[] = [];
        subcategories.forEach((subCategory) => {
          subCategoriesIdsInDB.push(subCategory._id.toString());
        });
        // check if subcategories ids in db include subcategories in req.body (true)
        const checker = (target: string[], arr: string[]) => target.every((v) => arr.includes(v));
        if (!checker(val, subCategoriesIdsInDB)) {
          return Promise.reject(new Error(`subcategories not belong to category`));
        }
      }),
    ),

  body('brand_id')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (brandId) => await checkBrandExist(brandId)),

  body('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),

  body('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,
];

export const getProductValidator = [param('id').isMongoId().withMessage('Invalid ID format'), validatorMiddleware];

export const deleteProductValidator = [param('id').isMongoId().withMessage('Invalid ID format'), validatorMiddleware];
