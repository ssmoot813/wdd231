// api.js
const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
    const apiKey = import.meta.env.VITE_NPS_API_KEY;
    const url = baseUrl + endpoint;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
}

function listTemplate(item) {
    return `<li><a href="${item.url}">${item.fullName}</a> ${item.states}</li>`;
}

async function renderClimbingList() {
    const endpoint = "activities/parks?q=climbing";
    const listElement = document.getElementById("outputList");
    const data = await getJson(endpoint);
    // data.data = array of matching activities; each has its own parks array
    const parks = data.data.flatMap((activity) => activity.parks);
    listElement.innerHTML = parks.map(listTemplate).join("");
}

renderClimbingList();