import {GameEventBase} from "./GameEventBase"
import {v4 as uuidv4}  from "uuid";

export class JoinGameEvent extends GameEventBase{
   teamId: string
    constructor(teamId: string, gameId: string){
        super("JoinGameEvent", gameId )
        this.teamId = teamId
    }

    public override toDbItem(){
        return{
            ...super.toDbItem(),
            teamId: {S: this.teamId}
        } 
    }
} 