const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "XN87YGdemo123";

function showResult(html) {
    document.getElementById("ajaxResult").innerHTML = html;
}

// CREATE
document.getElementById("createForm").onsubmit = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (![fd.get("name"), fd.get("height"), fd.get("weight")].every(x => x && x.length <= 30)) {
        showResult("Hiba: minden mező kötelező, max 30 karakter!");
        return;
    }
    const resp = await fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "create",
            code: CODE,
            name: fd.get("name"),
            height: fd.get("height"),
            weight: fd.get("weight")
        })
    });
    const text = await resp.text();
    showResult("Létrehozás eredménye: " + text);
    e.target.reset();
};

// READ
document.getElementById("readForm").onsubmit = async function (e) {
    e.preventDefault();
    const resp = await fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({ op: "read", code: CODE })
    });
    const data = await resp.json();
    let html = `<b>Rekordok száma:</b> ${data.rowCount}<br><ul>`;
    let sum = 0, max = null;
    data.list.forEach(row => {
        html += `<li>ID: ${row.id}, Név: ${row.name}, Magasság: ${row.height}, Súly: ${row.weight}</li>`;
        const h = parseFloat(row.height) || 0;
        sum += h;
        if (max === null || h > max) max = h;
    });
    html += "</ul>";
    html += `<b>Magasság összeg:</b> ${sum}<br>`;
    html += `<b>Magasság átlag:</b> ${data.list.length ? (sum / data.list.length).toFixed(2) : 0}<br>`;
    html += `<b>Legnagyobb magasság:</b> ${max !== null ? max : "-"}<br>`;
    showResult(html);
};

// DELETE
document.getElementById("deleteForm").onsubmit = async function (e) {
    e.preventDefault();
    const id = e.target.id.value.trim();
    if (!id) return showResult("ID megadása kötelező!");
    const resp = await fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({ op: "delete", code: CODE, id })
    });
    const text = await resp.text();
    showResult("Törlés eredménye: " + text);
    e.target.reset();
};

// UPDATE
document.getElementById("updateForm").onsubmit = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (![fd.get("name"), fd.get("height"), fd.get("weight")].every(x => x && x.length <= 30)) {
        showResult("Hiba: minden mező kötelező, max 30 karakter!");
        return;
    }
    const id = fd.get("id").trim();
    if (!id) return showResult("ID megadása kötelező!");
    const resp = await fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "update",
            code: CODE,
            id,
            name: fd.get("name"),
            height: fd.get("height"),
            weight: fd.get("weight")
        })
    });
    const text = await resp.text();
    showResult("Módosítás eredménye: " + text);
    e.target.reset();
};

// GET DATA FOR ID 
document.getElementById("getDataForId").onclick = async function () {
    const id = document.querySelector("#updateForm input[name='id']").value.trim();
    if (!id) return showResult("ID megadása kötelező!");
    const resp = await fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({ op: "read", code: CODE })
    });
    const data = await resp.json();
    if (!Array.isArray(data.list)) {
        showResult("Nincs ilyen ID!");
        return;
    }
    const row = data.list.find(r => String(r.id).trim() === id);
    if (!row) {
        showResult("Nincs ilyen ID!");
        return;
    }
    document.querySelector("#updateForm input[name='name']").value = row.name;
    document.querySelector("#updateForm input[name='height']").value = row.height;
    document.querySelector("#updateForm input[name='weight']").value = row.weight;
    showResult("Adatok betöltve.");
};
