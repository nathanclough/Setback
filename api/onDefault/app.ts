import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {CommandType} from "opt/nodejs/Commands"
import { handleCommand, handlerMap } from './handlers';
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 * Commands trigger events 
 *  when a command fails send a failure event to the ConnectionId that sent
 * Queries search through events 
 * 
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent)=> {
    console.log(event)
    let response: APIGatewayProxyResult;
    
    try {
        if(!event.body)
            throw new Error("No body")

        const command = JSON.parse(event.body)
        const commandType: CommandType= command.type
        const eventRes = await handleCommand({
            kind: command.type,
            v: command, 
            handler: handlerMap[commandType]})

        return {
            statusCode: 200,
            body: JSON.stringify(eventRes)
        }

    } catch (err: unknown) {
        console.log("ERror",err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }
};
