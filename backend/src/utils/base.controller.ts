import { Request, Response, NextFunction } from "express";

export class BaseController {
  protected handleRequest(
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void | Response>
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        res.status(500).json({ message: "Internal server error: " + error });
      }
    };
  }
}
