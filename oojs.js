// Alaposztály
class Animal {
    constructor(name) {
        this.name = name;
    }
    info() {
        return `${this.name} egy általános állat.`;
    }
    getType() {
        return "Állat";
    }
}

// Leszármazottak
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    info() {
        return `${this.name} egy ${this.breed} fajta kutya, nagyon hűséges és szeret játszani.`;
    }
    getType() {
        return "Kutya";
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    info() {
        return `${this.name} egy ${this.color} színű macska, szeret lustálkodni és kíváncsi természetű.`;
    }
    getType() {
        return "Macska";
    }
}

class AnimalApp {
    constructor(containerId) {
        this.animals = [
            new Dog("Bodri", "Puli"),
            new Cat("Cirmi", "szürke"),
            new Animal("Teknős")
        ];
        this.editIndex = null;
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = "";
        this.renderForm();
        this.renderList();
    }

    renderForm() {
        const form = document.createElement("form");
        form.id = "animalForm";
        form.innerHTML = `
            <h3>${this.editIndex === null ? "Új állat hozzáadása" : "Állat szerkesztése"}</h3>
            <label>
                Név: <input type="text" name="name" required maxlength="20">
            </label>
            <label>
                Típus:
                <select name="type">
                    <option value="Dog">Kutya</option>
                    <option value="Cat">Macska</option>
                    <option value="Animal">Egyéb</option>
                </select>
            </label>
            <span id="extraFields"></span>
            <button type="submit">${this.editIndex === null ? "Hozzáadás" : "Mentés"}</button>
            ${this.editIndex !== null ? '<button type="button" id="cancelEdit">Mégse</button>' : ""}
        `;
        // Extra mezők dinamikus kezelése
        const typeSelect = form.querySelector("select[name='type']");
        const extraFields = form.querySelector("#extraFields");
        const updateExtraFields = (type, values = {}) => {
            if (type === "Dog") {
                extraFields.innerHTML = `<label>Fajta: <input type="text" name="breed" required maxlength="20" value="${values.breed || ""}"></label>`;
            } else if (type === "Cat") {
                extraFields.innerHTML = `<label>Szín: <input type="text" name="color" required maxlength="20" value="${values.color || ""}"></label>`;
            } else {
                extraFields.innerHTML = "";
            }
        };
        typeSelect.onchange = () => updateExtraFields(typeSelect.value);
        if (this.editIndex !== null) {
            const animal = this.animals[this.editIndex];
            form.name.value = animal.name;
            if (animal instanceof Dog) {
                form.type.value = "Dog";
                updateExtraFields("Dog", { breed: animal.breed });
            } else if (animal instanceof Cat) {
                form.type.value = "Cat";
                updateExtraFields("Cat", { color: animal.color });
            } else {
                form.type.value = "Animal";
                updateExtraFields("Animal");
            }
        } else {
            updateExtraFields("Dog");
        }

        form.onsubmit = (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const type = form.type.value;
            let animal;
            if (type === "Dog") {
                const breed = form.breed.value.trim();
                if (!breed) return alert("A fajta megadása kötelező!");
                animal = new Dog(name, breed);
            } else if (type === "Cat") {
                const color = form.color.value.trim();
                if (!color) return alert("A szín megadása kötelező!");
                animal = new Cat(name, color);
            } else {
                animal = new Animal(name);
            }
            if (this.editIndex === null) {
                this.animals.push(animal);
            } else {
                this.animals[this.editIndex] = animal;
                this.editIndex = null;
            }
            this.render();
        };
        if (form.querySelector("#cancelEdit")) {
            form.querySelector("#cancelEdit").onclick = () => {
                this.editIndex = null;
                this.render();
            };
        }
        this.container.appendChild(form);
    }

    renderList() {
        const table = document.createElement("table");
        table.border = "1";
        table.style.marginTop = "1em";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Név</th>
                    <th>Típus</th>
                    <th>Jellemző</th>
                    <th>Leírás</th>
                    <th>Művelet</th>
                </tr>
            </thead>
            <tbody>
                ${this.animals.map((a, i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${a.name}</td>
                        <td>${a.getType()}</td>
                        <td>${a instanceof Dog ? a.breed :
                a instanceof Cat ? a.color : "-"
            }</td>
                        <td>${a.info()}</td>
                        <td>
                            <button onclick="animalApp.editAnimal(${i})">Szerkeszt</button>
                            <button onclick="animalApp.deleteAnimal(${i})">Törlés</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        `;
        this.container.appendChild(table);
    }

    editAnimal(idx) {
        this.editIndex = idx;
        this.render();
    }

    deleteAnimal(idx) {
        if (confirm("Biztosan törli ezt az állatot?")) {
            this.animals.splice(idx, 1);
            this.render();
        }
    }
}

// Globális példány, hogy a gombokból elérhető legyen
window.animalApp = new AnimalApp("oojs-demo");
