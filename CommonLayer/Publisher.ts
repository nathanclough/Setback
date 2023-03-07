import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { Event } from "./Events"
const Publish = async (event: Event)=> {
        const client = new DynamoDBClient({region:"us-east-1"})
        console.log(event.toDbItem())
        const command = new PutItemCommand({
            TableName: process.env.EVENTS_TABLE,
            Item: event.toDbItem(),
          })
          const result =  await client.send(command)    
          return result
}

export default {Publish}