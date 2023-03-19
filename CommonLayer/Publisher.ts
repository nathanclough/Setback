import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { Event } from "./Events"
const Publish = async (event: Event)=> {
        const client = new DynamoDBClient({region:"us-east-1"})
        console.log(event.toDbItem())
        const command = new PutItemCommand({
            TableName: process.env.EVENTS_TABLE,
            Item: event.toDbItem(),
          })
          console.log("no")
          const result =  await client.send(command)    
          console.log("Sent publisher result")
          return result
}

export default {Publish}