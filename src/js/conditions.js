import "../css/style.css";
import "../css/conditions.css";
import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityListTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
    const alertsContainer = document.querySelector(".alerts > ul");
    alertsContainer.innerHTML = "";
    const html = alerts.map(alertTemplate);
    alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenters(centers) {
    const centersContainer = document.querySelector(".visitor details ul");
    centersContainer.innerHTML = "";
    const html = centers.map(visitorCenterTemplate);
    centersContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivities(activities) {
    const activitiesContainer = document.querySelector(".activities details ul");
    activitiesContainer.innerHTML = activityListTemplate(activities);
}

async function init() {
    const parkData = await getParkData();
    const alerts = await getParkAlerts(parkData.parkCode);
    const visitorCenters = await getVisitorCenterData(parkData.parkCode);
    setHeaderFooter(parkData);
    setAlerts(alerts);
    setVisitorCenters(visitorCenters);
    setActivities(parkData.activities);
}

init();