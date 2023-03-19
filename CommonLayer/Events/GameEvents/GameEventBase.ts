import {Event} from "../Event"
export abstract class GameEventBase extends Event{
    /*
    TeamId
    */
   gameId:string
    constructor(EventName:string, gameId: string){
        super(EventName)
        this.gameId = gameId
    }

    public override toDbItem(){
        return{
            ...super.toDbItem(),
            gameId: {S: this.gameId}
        } 
    }
} 