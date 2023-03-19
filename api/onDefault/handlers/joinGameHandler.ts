import { H } from "./index"
import { JoinGameCommand } from "opt/nodejs/Commands"
import { JoinGameEvent } from "opt/nodejs/Events"
type JoinGameHandler = H<JoinGameCommand, JoinGameEvent>
export const joinGameHandler:JoinGameHandler = (command: JoinGameCommand): JoinGameEvent => {
    return new JoinGameEvent(command.teamId, command.gameId)
}