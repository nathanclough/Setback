import { Command } from "./Command"
export interface CreateGameCommand extends Command {
    teamId: string
    type: "CreateGameCommand"
}