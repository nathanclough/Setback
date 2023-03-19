import {GameEventBase} from "./GameEventBase"
import {v4 as uuidv4}  from "uuid";

export class CreateGameEvent extends GameEventBase{
   teamId: string
    constructor(teamId: string){
        super("CreateGameEvent", uuidv4() )
        if(!teamId)
        {
            throw new Error("TeamId is required")
        }
        this.teamId = teamId
    }

    public override toDbItem(){
        return{
            ...super.toDbItem(),
            teamId: {S: this.teamId}
        } 
    }
} 