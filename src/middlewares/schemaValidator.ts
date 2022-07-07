import { Request, Response } from "express";
import { unprocessableEntityError } from "./handleErrorsMiddleware.js";

export const validateSchema = (schema) => {
  return (req: Request, res: Response, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw unprocessableEntityError(
        error.details.map((detail) => detail.message)
      );
    }
    next();
  };
};
