import { AttributeValue } from "@aws-sdk/client-dynamodb"
import {Event} from "./Event"
export class DisconnectEvent extends Event{
    public readonly connectionId
    constructor(connectionId: string){
        super("DisconnectEvent")
        this.connectionId = connectionId
    }

    toDbItem(): Record<string, AttributeValue> {
        return {...super.toDbItem(),
        connectionId: {S: this.connectionId}}
    }
} 