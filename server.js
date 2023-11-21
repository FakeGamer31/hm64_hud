const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const chokidar = require("chokidar");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const filePath = "F:/Emulator/Project64/test.json";

app.use(express.static(__dirname));

// Überwache die Datei auf Änderungen
const watcher = chokidar.watch(filePath);
watcher.on("change", () => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      io.emit("json-update", jsonData);
    } catch (error) {
      console.error("Error with Json ", error);
    }
  });
});

debugger;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // Hier können Sie bei Bedarf weitere Socket.IO-Logik hinzufügen
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
