const express = require("express")
const {Server} = require("socket.io")
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./routers/authRouter")

const server = require("http").createServer(app) //takes both http and socket request 

const io = new Server(server, { //passing https server as 1st parameter
    cors: {
        origin: "http://localhost:3000",
        credentials: "true",
    },
});

app.use(helmet())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
})) //middleware is anything that runs in between the beggining and end of the req res cycle
app.use(express.json()); //recieve json and treat it as js object

app.use("/auth", authRouter)

io.on("connect", (socket)=>{}); //when socketio receives a connection this callback runs

server.listen(4000, ()=>{
    console.log("Server listening on port 4000");
})