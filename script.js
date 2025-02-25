document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#plant-table tbody");
    const inputs = {
        common: document.getElementById("common"),
        botanical: document.getElementById("botanical"),
        zone: document.getElementById("zone"),
        light: document.getElementById("light"),
        price: document.getElementById("price"),
        availability: document.getElementById("availability"),
    };

    function loadPlants() {
        fetch("plants.xml")
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                tableBody.innerHTML = "";
                const plants = data.getElementsByTagName("plant");
                for (let plant of plants) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${plant.getElementsByTagName("common")[0].textContent}</td>
                        <td>${plant.getElementsByTagName("botanical")[0].textContent}</td>
                        <td>${plant.getElementsByTagName("zone")[0].textContent}</td>
                        <td>${plant.getElementsByTagName("light")[0].textContent}</td>
                        <td>${plant.getElementsByTagName("price")[0].textContent}</td>
                        <td>${plant.getElementsByTagName("availability")[0].textContent}</td>
                    `;
                    row.addEventListener("click", () => selectRow(plant));
                    tableBody.appendChild(row);
                }
            });
    }

    function selectRow(plant) {
        inputs.common.value = plant.getElementsByTagName("common")[0].textContent;
        inputs.botanical.value = plant.getElementsByTagName("botanical")[0].textContent;
        inputs.zone.value = plant.getElementsByTagName("zone")[0].textContent;
        inputs.light.value = plant.getElementsByTagName("light")[0].textContent;
        inputs.price.value = plant.getElementsByTagName("price")[0].textContent;
        inputs.availability.value = plant.getElementsByTagName("availability")[0].textContent;
    }

    document.getElementById("reset").addEventListener("click", () => {
        Object.values(inputs).forEach(input => input.value = "");
    });

    loadPlants();
});