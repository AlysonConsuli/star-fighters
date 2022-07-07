import axios from "axios";

import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import * as fightersRepository from "../repositories/fightersRepository.js";

export const postBattle = async (firstUser: string, secondUser: string) => {
  const FIRST_URL = `https://api.github.com/users/${firstUser}/repos`;
  const SECOND_URL = `https://api.github.com/users/${secondUser}/repos`;
  try {
    const { data: infosFirstUser } = await axios.get(FIRST_URL);
    const { data: infosSecondUser } = await axios.get(SECOND_URL);
    let stargazersFirstUser: number = infosFirstUser.reduce(
      (total: number, obj: { stargazers_count: number }) => {
        let stargazers: number = +obj.stargazers_count;
        return total + stargazers;
      },
      0
    );
    let stargazersSecondUser: number = infosSecondUser.reduce(
      (total: number, obj: { stargazers_count: number }) => {
        let stargazers: number = +obj.stargazers_count;
        return total + stargazers;
      },
      0
    );
    const findFirstFighter = await fightersRepository.findFighter(firstUser);
    const findSecondFighter = await fightersRepository.findFighter(secondUser);
    if (!findFirstFighter) {
      await fightersRepository.insertFighter(firstUser);
    }
    if (!findSecondFighter) {
      await fightersRepository.insertFighter(secondUser);
    }
    if (stargazersFirstUser > stargazersSecondUser) {
      await fightersRepository.insertWin(firstUser);
      await fightersRepository.insertLoss(secondUser);
      return {
        winner: firstUser,
        loser: secondUser,
        draw: false,
      };
    }
    if (stargazersFirstUser < stargazersSecondUser) {
      await fightersRepository.insertWin(secondUser);
      await fightersRepository.insertLoss(firstUser);
      return {
        winner: secondUser,
        loser: firstUser,
        draw: false,
      };
    }
    await fightersRepository.insertDraw(firstUser);
    await fightersRepository.insertDraw(secondUser);
    return {
      winner: null,
      loser: null,
      draw: true,
    };
  } catch {
    throw notFoundError("Usuário não pertence ao github");
  }
};

export const getRanking = async () => {
  return await fightersRepository.ranking()
}
