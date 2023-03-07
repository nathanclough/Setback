import Publisher from "../../Publisher"
import { ConnectEvent } from "../../Events/ConnectEvent"
import {DynamoDBClient} from "@aws-sdk/client-dynamodb"
import {mockClient} from "aws-sdk-client-mock";

describe( "Publisher tests",() => {

    test("Called with an event publishes without error",async () =>{
        mockClient(DynamoDBClient)
        const event = new ConnectEvent("CONNECTION_ID")
        await Publisher.Publish(event)
    })
})