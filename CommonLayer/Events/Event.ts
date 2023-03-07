import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {v4 as uuidv4}  from "uuid";
export abstract class Event {
    timestamp: Date
    id: string
    eventType: string
    constructor(eventType: string) {
        this.id = uuidv4()
        this.timestamp = new Date()
        this.eventType = eventType
    }


    toDbItem():Record<string, AttributeValue>{
        return {
            id: {S: this.id}, 
            timestamp: {S: this.timestamp.toISOString()},
            type: {S: this.eventType}
        }
    } 
}