import db from "../config/db.js";

export const findFighter = async (username: string) => {
  const { rows } = await db.query(
    `SELECT * FROM fighters 
    WHERE username = $1`,
    [username]
  );

  return rows[0];
};

export const insertFighter = async (username: string) => {
  await db.query(
    `INSERT INTO "fighters" 
    (username, wins, losses, draws)
    VALUES ($1, 0, 0, 0)`,
    [username]
  );
};

export const insertWin = async (username: string) => {
  await db.query(
    `UPDATE "fighters" 
    SET wins = (
      SELECT wins 
      FROM fighters 
      WHERE username = $1) + 1
    WHERE username = $1`,
    [username]
  );
};

export const insertLoss = async (username: string) => {
  await db.query(
    `UPDATE "fighters" 
    SET losses = (
      SELECT losses 
      FROM fighters 
      WHERE username = $1) + 1
    WHERE username = $1`,
    [username]
  );
};

export const insertDraw = async (username: string) => {
  await db.query(
    `UPDATE "fighters" 
    SET draws = (
      SELECT draws 
      FROM fighters 
      WHERE username = $1) + 1
    WHERE username = $1`,
    [username]
  );
};

export const ranking = async () => {
  const { rows } = await db.query(
    `SELECT username, wins, losses, draws 
    FROM fighters 
    ORDER BY wins DESC, draws DESC`
  );
  return rows;
};
