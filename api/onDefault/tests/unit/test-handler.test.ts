import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import Publisher from 'opt/nodejs/Publisher';
describe('Unit test for app handler', function () {
    const env = process.env
    const EVENTS_TABLE = "tablename"
    const MockPublisher = jest.fn()
    beforeEach(() => {
        jest.resetModules()
        MockPublisher.mockResolvedValue({} as any)
        jest.spyOn(Publisher,"Publish").mockImplementation(MockPublisher)
        process.env = { ...env,  EVENTS_TABLE : EVENTS_TABLE}
    })

    afterEach(() => {
        process.env = env
    })

    test('Valid Create Game command publishes event', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
                type: "CreateGameCommand",
                teamId: "teamOneId"
            }),
      
        } as APIGatewayProxyEvent;
        await lambdaHandler(event);

        expect(MockPublisher).toBeCalledWith(expect.objectContaining({"eventType": "CreateGameEvent", teamId: "teamOneId"}));
        
    });

    test('Valid JoinGameCommand publishes event', async () => {
        const event: APIGatewayProxyEvent = {
            
                body: JSON.stringify({
                    type: "JoinGameCommand",
                    teamId: "teamId"
                })
        } as APIGatewayProxyEvent

        await lambdaHandler(event)

        expect(MockPublisher).toBeCalledWith(expect.objectContaining({"eventType": "JoinGameEvent",teamId: "teamId"}))
    })
});
