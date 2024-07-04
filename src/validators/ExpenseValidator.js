import { body, validationResult } from 'express-validator';

export const validateExpense = [
  body('date').isISO8601().withMessage('Date must be a valid date in YYYY-MM-DD format'),
  body('total').isFloat({ gt: 0 }).withMessage('Total must be a positive number'),
  body('category').isString().notEmpty().withMessage('Category is required'),
  body('description').isString().optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
