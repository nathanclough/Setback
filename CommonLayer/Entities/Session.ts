import { ConnectEvent } from "../Events/ConnectEvent";
import {DisconnectEvent} from "../Events/DisconnectEvent"
import { Event } from "../Events/Event";

export class Session{
    private connectionId: string
    private start: Date
    private end: Date | false
    constructor(connection:ConnectEvent){
        this.connectionId = connection.connectionId
        this.start = connection.timestamp
        this.end = false
    }

    public getStart(){
        return this.start
    }
    public getEnd(){
        return this.end
    }

    public onDisconnect(disconnect: DisconnectEvent){
        if (disconnect.connectionId === this.connectionId)
            this.end = disconnect.timestamp
    }

    public handler(event:Event){
        if( event instanceof ConnectEvent)
            console.log(event)
    }
}