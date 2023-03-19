import { Command, CreateGameCommand, JoinGameCommand } from "opt/nodejs/Commands";
import { CreateGameEvent, JoinGameEvent,Event } from "opt/nodejs/Events";
import Publisher from "opt/nodejs/Publisher";

// Thesse maps must have same keys for now look into forcing this with ts
type EventMap = {CreateGameCommand: CreateGameEvent, JoinGameCommand: JoinGameEvent}
type CommandMap = { CreateGameCommand:CreateGameCommand, JoinGameCommand: JoinGameCommand}

export type H<c extends Command, e extends Event> = (command: c) => e

type CommandRecord<K extends keyof CommandMap = keyof CommandMap> = { [P in K]: {
    kind: P,
    v: CommandMap[P],
    handler: (v: CommandMap[P]) => EventMap[P]
}}[K];

export * from "./handlerMap"

export async function handleCommand<K extends keyof CommandMap>(commandRecord: CommandRecord<K>) {
    const event = commandRecord.handler(commandRecord.v);  
    await Publisher.Publish(event)
    return event 
}
