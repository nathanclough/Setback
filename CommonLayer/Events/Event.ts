import {v4 as uuidv4}  from "uuid";
export abstract class Event {
    timestamp: Date
    id: string
    constructor() {
        this.id = uuidv4()
        this.timestamp = new Date()
    }

    toJSON():{[key:string]: string}{
        return{
            id: this.id,
            timestamp: this.timestamp.toISOString()
        }
    } 
}