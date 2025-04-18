let data = [
    { name: "Kiss Anna", age: 22, city: "Budapest", email: "anna.kiss@example.com" },
    { name: "Nagy Béla", age: 34, city: "Debrecen", email: "bela.nagy@example.com" },
    { name: "Tóth Csaba", age: 28, city: "Szeged", email: "csaba.toth@example.com" },
    { name: "Szabó Dóra", age: 19, city: "Pécs", email: "dora.szabo@example.com" }
];

let sortCol = null;
let sortAsc = true;

function renderTable(filter = "") {
    const tbody = document.querySelector("#crudTable tbody");
    tbody.innerHTML = "";
    let filtered = data.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(filter.toLowerCase())
        )
    );
    if (sortCol) {
        filtered.sort((a, b) => {
            if (a[sortCol] < b[sortCol]) return sortAsc ? -1 : 1;
            if (a[sortCol] > b[sortCol]) return sortAsc ? 1 : -1;
            return 0;
        });
    }
    filtered.forEach((row, idx) => {
        const tr = document.createElement("tr");
        if (row._edit) {
            tr.innerHTML = `
                <td><input type="text" value="${row.name}" id="editName${idx}" required minlength="2" maxlength="20"></td>
                <td><input type="number" value="${row.age}" id="editAge${idx}" required min="1" max="120"></td>
                <td><input type="text" value="${row.city}" id="editCity${idx}" required minlength="2" maxlength="20"></td>
                <td><input type="email" value="${row.email}" id="editEmail${idx}" required maxlength="30"></td>
                <td>
                    <button onclick="saveEdit(${idx})">Mentés</button>
                    <button onclick="cancelEdit(${idx})">Mégse</button>
                </td>
            `;
        } else {
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.city}</td>
                <td>${row.email}</td>
                <td>
                    <button onclick="editRow(${idx})">Szerkeszt</button>
                    <button onclick="deleteRow(${idx})">Törlés</button>
                </td>
            `;
        }
        tbody.appendChild(tr);
    });
}

document.getElementById("addForm").onsubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const age = parseInt(form.age.value, 10);
    const city = form.city.value.trim();
    const email = form.email.value.trim();
    if (!name || name.length < 2 || name.length > 20) return alert("Név: min 2, max 20 karakter!");
    if (!city || city.length < 2 || city.length > 20) return alert("Város: min 2, max 20 karakter!");
    if (!email || email.length > 30) return alert("Email: max 30 karakter!");
    if (!age || age < 1 || age > 120) return alert("Kor: 1-120!");
    data.push({ name, age, city, email });
    form.reset();
    renderTable(document.getElementById("searchInput").value);
};

function editRow(idx) {
    data[idx]._edit = true;
    renderTable(document.getElementById("searchInput").value);
}

function saveEdit(idx) {
    const name = document.getElementById(`editName${idx}`).value.trim();
    const age = parseInt(document.getElementById(`editAge${idx}`).value, 10);
    const city = document.getElementById(`editCity${idx}`).value.trim();
    const email = document.getElementById(`editEmail${idx}`).value.trim();
    if (!name || name.length < 2 || name.length > 20) return alert("Név: min 2, max 20 karakter!");
    if (!city || city.length < 2 || city.length > 20) return alert("Város: min 2, max 20 karakter!");
    if (!email || email.length > 30) return alert("Email: max 30 karakter!");
    if (!age || age < 1 || age > 120) return alert("Kor: 1-120!");
    data[idx] = { name, age, city, email };
    renderTable(document.getElementById("searchInput").value);
}

function cancelEdit(idx) {
    delete data[idx]._edit;
    renderTable(document.getElementById("searchInput").value);
}

function deleteRow(idx) {
    if (confirm("Biztosan törli ezt a sort?")) {
        data.splice(idx, 1);
        renderTable(document.getElementById("searchInput").value);
    }
}

document.getElementById("searchInput").oninput = function (e) {
    renderTable(e.target.value);
};

document.querySelectorAll("#crudTable th[data-col]").forEach(th => {
    th.style.cursor = "pointer";
    th.onclick = function () {
        const col = th.getAttribute("data-col");
        if (sortCol === col) sortAsc = !sortAsc;
        else { sortCol = col; sortAsc = true; }
        renderTable(document.getElementById("searchInput").value);
    };
});

renderTable();
