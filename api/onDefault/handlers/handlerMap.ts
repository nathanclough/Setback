import { createGameHandler } from "./createGameHandler";
import { joinGameHandler } from "./joinGameHandler";

export const handlerMap = {CreateGameCommand: createGameHandler, JoinGameCommand: joinGameHandler}
