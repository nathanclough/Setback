import { CreateGameCommand, JoinGameCommand } from 'Commands'
import { JoinGameEvent } from 'Events'
import { CreateGameEvent } from 'Events/GameEvents/CreateGameEvent'
import WebSocket from 'ws'
const url = "wss://9ur1d99mo4.execute-api.us-east-1.amazonaws.com/prod/"

describe("Game event integration tests", () => {
    var clientSocket: WebSocket
    var clientSocket2: WebSocket
    beforeAll(done => {
        var connections = 0
        const connect = () => {
            connections += 1 
            if(connections === 2){
                done()
            }
        }
        clientSocket = new WebSocket(url)
        clientSocket.on("open", (callbackData:string) => {
            console.log("callback", callbackData)
            connect()
        })

        clientSocket2 = new WebSocket(url)
        clientSocket2.on("open", (callbackData:string) => {
            console.log("callback", callbackData)
            connect()
        })
    })

    afterAll(() => {
        clientSocket.terminate()
        clientSocket2.terminate()
    })
    test("Create game and join", (done) =>{
        // Run create game event
        const createGame = (cb:(gameId:string) => void) => {
            const CreateGameCommand : CreateGameCommand = {
                teamId: 'team1',
                type: "CreateGameCommand"
            }
            clientSocket.send(JSON.stringify(CreateGameCommand))
            clientSocket.on("message",(data)=> {
                console.log(data.toString())
                const CreateGameEvent: CreateGameEvent= JSON.parse(data.toString())
                cb(CreateGameEvent.gameId)
            })     
        }

        const joinGame = ( id: string) => {
            const JoinGameCommand : JoinGameCommand = {
                teamId: 'team2',
                gameId: id,
                type: 'JoinGameCommand'
            }
            clientSocket2.send(JSON.stringify(JoinGameCommand))
            clientSocket2.on("message", (data) => {
                console.log(data.toString())
                const joinGameEvent : JoinGameEvent = JSON.parse(data.toString())
                expect(joinGameEvent.teamId).toBe("team2")
                expect(joinGameEvent.gameId).toBe(id)           
                done()
            })


            
        } 

        createGame(joinGame)
    })

})