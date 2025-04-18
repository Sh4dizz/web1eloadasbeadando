// Web Storage 
function saveToStorage() {
    const val = document.getElementById("storageInput").value;
    localStorage.setItem("demo", val);
    document.getElementById("storageResult").textContent = "Elmentve!";
}
function loadFromStorage() {
    const val = localStorage.getItem("demo") || "";
    document.getElementById("storageResult").textContent = "Tárolt érték: " + val;
}

// Web Worker 
let worker;
function startWorker() {
    if (window.Worker) {
        if (!worker) {
            worker = new Worker(URL.createObjectURL(new Blob([`
                self.onmessage = function(e) {
                    let sum = 0;
                    for(let i=0;i<1e7;i++) sum += i;
                    self.postMessage(sum);
                }
            `], { type: 'application/javascript' })));
            worker.onmessage = function (e) {
                document.getElementById("workerResult").textContent = "Összeg: " + e.data;
            };
        }
        worker.postMessage("");
        document.getElementById("workerResult").textContent = "Számolás...";
    } else {
        document.getElementById("workerResult").textContent = "A böngésző nem támogatja a Workert.";
    }
}

// Server-Sent Events
function showSseInfo() {
    document.getElementById("sseResult").textContent = "SSE működéséhez szerver szükséges. Példa: var es = new EventSource(url);";
}

// Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        document.getElementById("geoResult").textContent = "Lekérés...";
        navigator.geolocation.getCurrentPosition(
            pos => {
                document.getElementById("geoResult").textContent =
                    "Szélesség: " + pos.coords.latitude + ", Hosszúság: " + pos.coords.longitude;
            },
            err => {
                document.getElementById("geoResult").textContent = "Hiba: " + err.message;
            }
        );
    } else {
        document.getElementById("geoResult").textContent = "A böngésző nem támogatja a Geolocation API-t.";
    }
}

// Drag and Drop API 
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = "";
    ev.target.appendChild(document.getElementById(data));
}

// Canvas 
window.onload = function () {
    const c = document.getElementById("myCanvas");
    if (c && c.getContext) {
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#2196f3";
        ctx.fillRect(10, 10, 80, 60);
        ctx.beginPath();
        ctx.arc(130, 40, 30, 0, 2 * Math.PI);
        ctx.fillStyle = "#4caf50";
        ctx.fill();
        ctx.font = "16px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("Canvas példa", 40, 90);
    }
};
