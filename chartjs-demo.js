const tableData = [
    [12, 19, 3, 5, 2],
    [7, 11, 8, 15, 6],
    [14, 6, 9, 10, 13],
    [4, 17, 12, 8, 9],
    [10, 5, 16, 7, 11]
];

function renderTable() {
    const tbody = document.querySelector("#numTable tbody");
    tbody.innerHTML = "";
    tableData.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${i + 1}</td>` + row.map(n => `<td>${n}</td>`).join("");
        tr.style.cursor = "pointer";
        tr.onclick = () => drawChart(row, i + 1);
        tbody.appendChild(tr);
    });
}

let chart;
function drawChart(data, rowIdx) {
    const ctx = document.getElementById("lineChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [{
                label: `#${rowIdx}. sor adatai`,
                data: data,
                borderColor: "#2196f3",
                backgroundColor: "rgba(33,150,243,0.2)",
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

renderTable();
