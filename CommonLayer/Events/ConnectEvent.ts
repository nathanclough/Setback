import {Event} from "./Event"
export class ConnectEvent extends Event{
    public readonly connectionId
    constructor(connectionId: string){
        super()
        this.connectionId = connectionId
    }

    public override toJSON(){
        
        return{
            ...super.toJSON(),
            connectionId: this.connectionId
        } 
    }
} 