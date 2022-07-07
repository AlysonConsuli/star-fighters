import { Router } from "express";

import { getRanking, postBattle } from "../controllers/fightersController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { fighterSchema } from "../schemas/fightersSchema.js";

const fightersRouter = Router();
fightersRouter.post("/battle", validateSchema(fighterSchema), postBattle);
fightersRouter.get("/ranking", getRanking);

export default fightersRouter;
