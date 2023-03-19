import { Command } from "./Command"

export interface JoinGameCommand extends Command{
    teamId: string
    gameId: string
    type: "JoinGameCommand"
}