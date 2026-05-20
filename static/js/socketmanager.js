console.log("[SocketManager] Trying to connect to thebackend.eletrix.fr")

// load socket io

const socket = io("ws://localhost:5001", { transports: ["websocket"] }, );

socket.on("connect", () => {
  console.log("[SocketManager] Connected to the backend");
});

socket.on("connect_error", (err) => {
  console.log("[SocketManager] Disconnected from the backend");
  //new Audio("/static/audio/fah.mp3").play();

});

socket.on("activeuser",(data)=>{
    console.log("[SocketManager] Active user : "+data);
    document.getElementById("activeuser").innerHTML = data.count;
})
    
