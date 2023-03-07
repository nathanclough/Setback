import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb"
import { DisconnectEvent } from "opt/nodejs/Events"; 
import Publisher from "opt/nodejs/Publisher";
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    let response: APIGatewayProxyResult;
    if(!event.requestContext.connectionId)
        return {statusCode: 500, body: JSON.stringify({
            message:"No connectionId",
        })}
    try {
        const disconnectEvent = new DisconnectEvent(event.requestContext.connectionId)
        await Publisher.Publish(disconnectEvent)
        
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world - from disconnect',
            }),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    console.log(response)
    return response;
};
