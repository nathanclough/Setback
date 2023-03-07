import {Event} from "./Event"
export class ConnectEvent extends Event{
    public readonly connectionId
    constructor(connectionId: string){
        super("ConnectEvent")
        this.connectionId = connectionId
    }

    public override toDbItem(){
        return{
            ...super.toDbItem(),
            connectionId: {S: this.connectionId}
        } 
    }
} 