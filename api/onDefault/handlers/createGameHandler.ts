import { CreateGameCommand } from "opt/nodejs/Commands"
import { CreateGameEvent } from "opt/nodejs/Events"
import { H } from "handlers"
type CreateGameHandler =  H<CreateGameCommand, CreateGameEvent>
export const createGameHandler: CreateGameHandler= (command: CreateGameCommand) : CreateGameEvent => {
    return  new CreateGameEvent(command.teamId)
}
