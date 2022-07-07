import { Request, Response } from "express";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import * as fightersService from "../services/fightersService.js";

export const postBattle = async (req: Request, res: Response) => {
  const firstUser: string = req.body.firstUser;
  const secondUser: string = req.body.secondUser;
  if (firstUser === secondUser) {
    throw conflictError("Usuários não podem ter o mesmo nome!");
  }
  const result = await fightersService.postBattle(firstUser, secondUser);
  res.status(201).send(result);
};

export const getRanking = async (req: Request, res: Response) => {
  const fighters = await fightersService.getRanking();
  res.status(200).send({ fighters });
};
