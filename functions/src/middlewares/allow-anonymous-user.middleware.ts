import {Request, Response, NextFunction} from "express";
import {ForbiddenError} from "../errors/forbidden.error.js";

const publicGetRoutesList: string[] = [
  "/companies",
  "/products",
  "/categories",
  "/payment-methods",
  "/orders",
];

const publicPostRoutesList: string[] = [
  "/orders",
];

const isPublicGetRoutesList = (req: Request): boolean => {
  return publicGetRoutesList.some(route => req.url.startsWith(route));
};

const isPublicPostRoutesList = (req: Request): boolean => {
  return publicPostRoutesList.some(route => req.url.startsWith(route));
};

export const allowAnonymousUser = (req: Request, res: Response, next: NextFunction) => {
  // Allow anonymous users to access the route
  if (req.user) return next();

  if (req.method === "GET" && isPublicGetRoutesList(req)) {
    return next();
  } else if (req.method === "POST" && isPublicPostRoutesList(req)) {
    return next();
  }

  next(new ForbiddenError("Access denied for anonymous users."));
};
