import {Event} from "./Event"
export class DisconnectEvent extends Event{
    public readonly connectionId
    constructor(connectionId: string){
        super()
        this.connectionId = connectionId
    }
} 