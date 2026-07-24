"use strict";

/*
 * Cuenta regresiva al inicio de la misa:
 * Viernes 11 de septiembre de 2026
 * 3:30 p. m., hora de Ciudad de México
 */

const eventDate = new Date("2026-09-11T15:30:00-06:00").getTime();

const countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    message: document.getElementById("countdown-message")
};

function formatCountdownNumber(value) {
    return String(value).padStart(2, "0");
}

function updateCountdownValue(element, value) {

    if (!element) {
        return;
    }

    const formattedValue = formatCountdownNumber(value);

    if (element.textContent === formattedValue) {
        return;
    }

    element.classList.remove("is-changing");

    /* Reinicia la animación */
    void element.offsetWidth;

    element.textContent = formattedValue;
    element.classList.add("is-changing");
}

function updateCountdown() {

    const now = Date.now();
    const remainingTime = eventDate - now;

    if (remainingTime <= 0) {

        updateCountdownValue(countdownElements.days, 0);
        updateCountdownValue(countdownElements.hours, 0);
        updateCountdownValue(countdownElements.minutes, 0);
        updateCountdownValue(countdownElements.seconds, 0);

        if (countdownElements.message) {
            countdownElements.message.textContent =
                "¡Hoy celebramos 58 años de amor!";
        }

        return;
    }

    const days = Math.floor(
        remainingTime / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (remainingTime % (1000 * 60)) /
        1000
    );

    updateCountdownValue(countdownElements.days, days);
    updateCountdownValue(countdownElements.hours, hours);
    updateCountdownValue(countdownElements.minutes, minutes);
    updateCountdownValue(countdownElements.seconds, seconds);
}

updateCountdown();

setInterval(updateCountdown, 1000);