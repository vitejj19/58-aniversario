"use strict";


/* ==========================================
   APERTURA DE LA INVITACIÓN Y MÚSICA
========================================== */

const invitationIntro =
    document.getElementById(
        "invitation-intro"
    );

const openInvitationButton =
    document.getElementById(
        "open-invitation-button"
    );

const backgroundMusic =
    document.getElementById(
        "background-music"
    );

const musicControl =
    document.getElementById(
        "music-control"
    );


function updateMusicControl(
    isPlaying
) {

    if (!musicControl) {
        return;
    }

    if (isPlaying) {

        musicControl.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

        musicControl.setAttribute(
            "aria-label",
            "Pausar música"
        );

        musicControl.classList.remove(
            "is-paused"
        );

    } else {

        musicControl.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

        musicControl.setAttribute(
            "aria-label",
            "Reproducir música"
        );

        musicControl.classList.add(
            "is-paused"
        );
    }
}


async function playBackgroundMusic() {

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0.45;

    try {

        await backgroundMusic.play();

        if (musicControl) {
            musicControl.hidden = false;
        }

        updateMusicControl(true);

    } catch (error) {

        console.warn(
            "El navegador no permitió reproducir la música:",
            error
        );

        if (musicControl) {
            musicControl.hidden = false;
        }

        updateMusicControl(false);
    }
}


function openInvitation() {

    if (!invitationIntro) {

        console.error(
            "No se encontró #invitation-intro."
        );

        return;
    }

    invitationIntro.classList.add(
        "is-opening"
    );

    if (openInvitationButton) {
        openInvitationButton.disabled = true;
    }

    /*
     * La música comienza como consecuencia
     * directa del clic sobre el sello.
     */

    playBackgroundMusic();

    window.setTimeout(
        () => {

            invitationIntro.classList.add(
                "is-hidden"
            );

            document.body.classList.remove(
                "intro-active"
            );

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        },
        1600
    );
}


if (
    invitationIntro &&
    openInvitationButton
) {

    document.body.classList.add(
        "intro-active"
    );

    openInvitationButton.addEventListener(
        "click",
        openInvitation
    );

} else {

    console.error(
        "No se encontró la pantalla de apertura o su botón.",
        {
            invitationIntro,
            openInvitationButton
        }
    );
}


/* ==========================================
   CONTROL DE MÚSICA
========================================== */

if (
    backgroundMusic &&
    musicControl
) {

    musicControl.addEventListener(
        "click",
        async () => {

            if (backgroundMusic.paused) {

                try {

                    await backgroundMusic.play();

                    updateMusicControl(true);

                } catch (error) {

                    console.warn(
                        "No fue posible reproducir la música:",
                        error
                    );

                    updateMusicControl(false);
                }

            } else {

                backgroundMusic.pause();

                updateMusicControl(false);
            }
        }
    );

    backgroundMusic.addEventListener(
        "play",
        () => {

            updateMusicControl(true);
        }
    );

    backgroundMusic.addEventListener(
        "pause",
        () => {

            updateMusicControl(false);
        }
    );

    backgroundMusic.addEventListener(
        "error",
        () => {

            console.error(
                "No fue posible cargar el archivo de música. " +
                "Revisa la ruta y el nombre del archivo."
            );

            musicControl.hidden = true;
        }
    );
}


/* ==========================================
   CONFIGURACIÓN DE GOOGLE APPS SCRIPT
========================================== */

/*
 * Coloca aquí tu URL real de Apps Script.
 * Debe terminar en /exec.
 */

const API_URL =
    "https://script.google.com/macros/s/AKfycbz05vRoMf_gdozG1xNzrq8O1B_SFdBv0SavKbINkefzaoid2Ido1UbILU-f3b_YhoFUqA/exec";

/* ==========================================
   FECHA LÍMITE DE CONFIRMACIÓN
========================================== */

/*
 * Se permiten confirmaciones durante todo el
 * 15 de agosto de 2026.
 *
 * El bloqueo comienza el 16 de agosto de 2026
 * a las 00:00 horas, tiempo del centro de México.
 */

const CONFIRMATION_DEADLINE =
    new Date(
        "2026-08-16T00:00:00-06:00"
    );

const CONFIRMATION_DEADLINE_MESSAGE =
    "El periodo de confirmación finalizó " +
    "el 15 de agosto de 2026.";


function isConfirmationDeadlineExpired() {

    return (
        new Date().getTime() >=
        CONFIRMATION_DEADLINE.getTime()
    );
}

/* ==========================================
   COPIAR CLABE BANCARIA
========================================== */

const copyBankButton =
    document.querySelector(
        ".copy-bank-button"
    );

const copyMessage =
    document.getElementById(
        "copy-message"
    );


if (copyBankButton) {

    copyBankButton.addEventListener(
        "click",
        async () => {

            const targetId =
                copyBankButton.dataset.copyTarget;

            const targetElement =
                document.getElementById(
                    targetId
                );

            if (!targetElement) {
                return;
            }

            const textToCopy =
                targetElement.textContent.trim();

            try {

                await navigator.clipboard.writeText(
                    textToCopy
                );

                if (copyMessage) {

                    copyMessage.textContent =
                        "CLABE copiada correctamente.";
                }

            } catch (error) {

                console.error(
                    "No fue posible copiar la CLABE:",
                    error
                );

                if (copyMessage) {

                    copyMessage.textContent =
                        "No fue posible copiar la CLABE. " +
                        "Puedes seleccionarla manualmente.";
                }
            }
        }
    );
}


/* ==========================================
   ELEMENTOS DEL FORMULARIO
========================================== */

const confirmationForm =
    document.getElementById(
        "confirmation-form"
    );

const invitedFamily =
    document.getElementById(
        "invited-family"
    );

const reservedPlacesNumber =
    document.getElementById(
        "reserved-places-number"
    );

const reservedPlacesLabel =
    document.getElementById(
        "reserved-places-label"
    );

const invitationCodeInput =
    document.getElementById(
        "invitation-code"
    );

const maximumGuestsInput =
    document.getElementById(
        "maximum-guests"
    );

const guestNameInput =
    document.getElementById(
        "guest-name"
    );

const guestCountSelect =
    document.getElementById(
        "guest-count"
    );

const guestCountGroup =
    document.getElementById(
        "guest-count-group"
    );

const guestMessageInput =
    document.getElementById(
        "guest-message"
    );

const confirmationStatus =
    document.getElementById(
        "confirmation-status"
    );

const invalidInvitation =
    document.getElementById(
        "invalid-invitation"
    );

const confirmationButton =
    document.querySelector(
        ".confirmation-button"
    );

const whatsappConfirmationLink =
    document.getElementById(
        "whatsapp-confirmation-link"
    );

const attendanceInputs =
    document.querySelectorAll(
        'input[name="attendance"]'
    );


/* ==========================================
   INFORMACIÓN ACTUAL
========================================== */

let currentInvitation = null;
let currentSettings = null;


/* ==========================================
   OBTENER CÓDIGO DESDE LA URL
========================================== */

function getInvitationCode() {

    const parameters =
        new URLSearchParams(
            window.location.search
        );

    return (
        parameters.get("invitacion") ||
        parameters.get("code") ||
        ""
    )
        .trim()
        .toUpperCase();
}


/* ==========================================
   MENSAJES DEL FORMULARIO
========================================== */

function setConfirmationStatus(
    message,
    type = "normal"
) {

    if (!confirmationStatus) {
        return;
    }

    confirmationStatus.textContent =
        message;

    confirmationStatus.classList.toggle(
        "is-error",
        type === "error"
    );

    confirmationStatus.classList.toggle(
        "is-success",
        type === "success"
    );
}


/* ==========================================
   ESTADO DEL BOTÓN DE CONFIRMACIÓN
========================================== */

function setFormLoading(
    isLoading
) {

    if (!confirmationButton) {
        return;
    }

    confirmationButton.disabled =
        isLoading;

    confirmationButton.innerHTML =
        isLoading
            ? `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Guardando confirmación...
              `
            : `
                <i class="fa-solid fa-check"></i>
                Confirmar asistencia
              `;
}


/* ==========================================
   OCULTAR BOTÓN DE WHATSAPP
========================================== */

function hideWhatsAppButton() {

    if (!whatsappConfirmationLink) {
        return;
    }

    whatsappConfirmationLink.hidden = true;
    whatsappConfirmationLink.href = "#";
}


/* ==========================================
   INVITACIÓN INVÁLIDA
========================================== */

function showInvalidInvitation(
    message
) {

    if (confirmationForm) {
        confirmationForm.hidden = true;
    }

    if (invalidInvitation) {

        invalidInvitation.hidden = false;

        const messageElement =
            invalidInvitation.querySelector(
                "p"
            );

        if (
            messageElement &&
            message
        ) {

            messageElement.textContent =
                message;
        }
    }
}


/* ==========================================
   INVITACIÓN VÁLIDA
========================================== */

function showValidInvitation() {

    if (confirmationForm) {
        confirmationForm.hidden = false;
    }

    if (invalidInvitation) {
        invalidInvitation.hidden = true;
    }
}


/* ==========================================
   OPCIONES DE ASISTENTES
========================================== */

function populateGuestOptions(
    maximumGuests,
    selectedGuests = 0
) {

    if (!guestCountSelect) {
        return;
    }

    guestCountSelect.innerHTML = `
        <option value="">
            Selecciona una opción
        </option>
    `;

    for (
        let number = 1;
        number <= maximumGuests;
        number += 1
    ) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            String(number);

        option.textContent =
            number === 1
                ? "1 persona"
                : `${number} personas`;

        if (
            number === selectedGuests
        ) {

            option.selected = true;
        }

        guestCountSelect.appendChild(
            option
        );
    }
}


/* ==========================================
   MOSTRAR U OCULTAR NÚMERO DE PERSONAS
========================================== */

function toggleGuestCount(
    attendanceValue
) {

    if (
        !guestCountGroup ||
        !guestCountSelect
    ) {

        return;
    }

    const willAttend =
        attendanceValue === "Sí";

    guestCountGroup.hidden =
        !willAttend;

    guestCountSelect.required =
        willAttend;

    if (!willAttend) {
        guestCountSelect.value = "";
    }
}


/* ==========================================
   CONSULTAR INVITACIÓN
========================================== */

async function loadInvitation() {

    if (!confirmationForm) {
        return;
    }

    const invitationCode =
        getInvitationCode();

    hideWhatsAppButton();

    if (guestCountGroup) {
        guestCountGroup.hidden = true;
    }

    if (!invitationCode) {

        showInvalidInvitation(
            "Este enlace no contiene un código " +
            "de invitación válido. Solicita nuevamente " +
            "tu enlace personalizado."
        );

        return;
    }

    setConfirmationStatus(
        "Consultando tu invitación..."
    );

    try {

        const requestUrl =
            `${API_URL}` +
            `?action=invitation` +
            `&code=${encodeURIComponent(
                invitationCode
            )}`;

        const response =
            await fetch(
                requestUrl,
                {
                    method: "GET",
                    redirect: "follow",
                    cache: "no-store"
                }
            );

        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );
        }

        const result =
            await response.json();

        if (
            !result.success ||
            !result.valid ||
            !result.invitation
        ) {

            showInvalidInvitation(
                result.message ||
                "No pudimos identificar esta invitación."
            );

            setConfirmationStatus("");

            return;
        }

        currentInvitation =
            result.invitation;

        currentSettings =
            result.settings || {};

        showValidInvitation();

        renderInvitationData();

    } catch (error) {

        console.error(
            "Error al consultar la invitación:",
            error
        );

        showInvalidInvitation(
            "No fue posible consultar la invitación. " +
            "Verifica tu conexión e intenta nuevamente."
        );

        setConfirmationStatus("");
    }
}


/* ==========================================
   MOSTRAR INFORMACIÓN DE LA INVITACIÓN
========================================== */

function renderInvitationData() {

    if (!currentInvitation) {
        return;
    }

    const reservedPlaces =
        Number(
            currentInvitation.reservedPlaces
        );

    if (invitedFamily) {

        invitedFamily.textContent =
            currentInvitation.family;
    }

    if (reservedPlacesNumber) {

        reservedPlacesNumber.textContent =
            String(reservedPlaces);
    }

    if (reservedPlacesLabel) {

        reservedPlacesLabel.textContent =
            reservedPlaces === 1
                ? "lugar para su familia"
                : "lugares para su familia";
    }

    if (invitationCodeInput) {

        invitationCodeInput.value =
            currentInvitation.code;
    }

    if (maximumGuestsInput) {

        maximumGuestsInput.value =
            String(reservedPlaces);
    }

    populateGuestOptions(
        reservedPlaces,
        Number(
            currentInvitation.confirmedGuests
        ) || 0
    );

    if (
        currentInvitation.alreadyAnswered
    ) {

        if (guestNameInput) {

            guestNameInput.value =
                currentInvitation.confirmedBy ||
                "";
        }

        if (guestMessageInput) {

            guestMessageInput.value =
                currentInvitation.message ||
                "";
        }

        const attendanceValue =
            currentInvitation.status ===
            "Confirmado"
                ? "Sí"
                : "No";

        const attendanceInput =
            document.querySelector(
                `input[name="attendance"]` +
                `[value="${attendanceValue}"]`
            );

        if (attendanceInput) {
            attendanceInput.checked = true;
        }

        toggleGuestCount(
            attendanceValue
        );

        setConfirmationStatus(
            currentSettings.allowChanges
                ? "Esta invitación ya fue respondida. " +
                  "Puedes actualizar la confirmación."
                : "Esta invitación ya fue respondida.",
            "success"
        );

        if (
            !currentSettings.allowChanges
        ) {

            disableConfirmationForm();
        }

    } else {

        setConfirmationStatus("");
    }

    if (
    currentSettings.deadlineExpired ||
    isConfirmationDeadlineExpired()
) {

    setConfirmationStatus(
        CONFIRMATION_DEADLINE_MESSAGE,
        "error"
    );

    disableConfirmationForm();
}
}


/* ==========================================
   DESACTIVAR FORMULARIO
========================================== */

function disableConfirmationForm() {

    if (!confirmationForm) {
        return;
    }

    confirmationForm
        .querySelectorAll(
            "input, select, textarea, button"
        )
        .forEach(
            (element) => {

                element.disabled = true;
            }
        );
}


/* ==========================================
   CAMBIO DE ASISTENCIA
========================================== */

attendanceInputs.forEach(
    (radioButton) => {

        radioButton.addEventListener(
            "change",
            (event) => {

                toggleGuestCount(
                    event.target.value
                );

                hideWhatsAppButton();

                setConfirmationStatus("");
            }
        );
    }
);


/* ==========================================
   OCULTAR WHATSAPP AL CAMBIAR DATOS
========================================== */

[
    guestNameInput,
    guestCountSelect,
    guestMessageInput
]
    .filter(Boolean)
    .forEach(
        (element) => {

            element.addEventListener(
                "input",
                hideWhatsAppButton
            );

            element.addEventListener(
                "change",
                hideWhatsAppButton
            );
        }
    );


/* ==========================================
   VALIDACIÓN
========================================== */

function validateConfirmationData(
    data
) {

    if (!data.confirmedBy) {

        return (
            "Indica el nombre de quien confirma."
        );
    }

    if (!data.attendance) {

        return (
            "Selecciona si asistirán o no."
        );
    }

    if (
        data.attendance === "Sí"
    ) {

        if (
            !Number.isInteger(
                data.confirmedGuests
            ) ||
            data.confirmedGuests < 1
        ) {

            return (
                "Selecciona el número de personas " +
                "que asistirán."
            );
        }

        if (
            data.confirmedGuests >
            data.maximumGuests
        ) {

            return (
                `Esta invitación tiene ` +
                `${data.maximumGuests} ` +
                `${
                    data.maximumGuests === 1
                        ? "lugar reservado"
                        : "lugares reservados"
                }. Selecciona un número igual ` +
                "o menor para continuar."
            );
        }
    }

    return "";
}


/* ==========================================
   ENVIAR CONFIRMACIÓN
========================================== */

if (confirmationForm) {

    confirmationForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            hideWhatsAppButton();

            if (!currentInvitation) {

                setConfirmationStatus(
                    "No fue posible identificar esta invitación.",
                    "error"
                );

                return;
            }

            if (
                isConfirmationDeadlineExpired()
            ) {

                setConfirmationStatus(
                    CONFIRMATION_DEADLINE_MESSAGE,
                    "error"
                );

                disableConfirmationForm();

                return;
            }

            const formData =
                new FormData(
                    confirmationForm
                );

            const attendance =
                formData.get(
                    "attendance"
                );

            const payload = {

                action: "confirm",

                code:
                    currentInvitation.code,

                confirmedBy:
                    String(
                        formData.get(
                            "guestName"
                        ) || ""
                    ).trim(),

                attendance:
                    attendance || "",

                confirmedGuests:
                    attendance === "Sí"
                        ? Number(
                            formData.get(
                                "guestCount"
                            )
                        )
                        : 0,

                maximumGuests:
                    Number(
                        currentInvitation
                            .reservedPlaces
                    ),

                message:
                    String(
                        formData.get(
                            "guestMessage"
                        ) || ""
                    ).trim()
            };

            const validationMessage =
                validateConfirmationData(
                    payload
                );

            if (validationMessage) {

                setConfirmationStatus(
                    validationMessage,
                    "error"
                );

                return;
            }

            setFormLoading(true);

            setConfirmationStatus(
                "Guardando tu confirmación..."
            );

            try {

                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify(
                                    payload
                                ),

                            redirect: "follow"
                        }
                    );

                if (!response.ok) {

                    throw new Error(
                        `Error HTTP ${response.status}`
                    );
                }

                const result =
                    await response.json();

                if (!result.success) {

                    throw new Error(
                        result.message ||
                        "La confirmación fue rechazada."
                    );
                }

                currentInvitation.status =
                    result.confirmation.status;

                currentInvitation
                    .confirmedGuests =
                    result.confirmation
                        .confirmedGuests;

                currentInvitation
                    .confirmedBy =
                    payload.confirmedBy;

                currentInvitation.message =
                    payload.message;

                currentInvitation
                    .alreadyAnswered = true;

                setConfirmationStatus(
                    result.message,
                    "success"
                );

                prepareWhatsAppConfirmation(
                    result,
                    payload
                );

            } catch (error) {

                console.error(
                    "Error al guardar la confirmación:",
                    error
                );

                setConfirmationStatus(
                    error.message ||
                    "No fue posible guardar la confirmación.",
                    "error"
                );

            } finally {

                setFormLoading(false);
            }
        }
    );
}


/* ==========================================
   PREPARAR ENLACE DE WHATSAPP
========================================== */

function prepareWhatsAppConfirmation(
    result,
    payload
) {

    const whatsappNumber =
        String(
            result.whatsappNumber || ""
        ).replace(/\D/g, "");

    if (
        !whatsappNumber ||
        !whatsappConfirmationLink
    ) {

        return;
    }

    const confirmation =
        result.confirmation;

    const messageLines = [

        "💍 Confirmación — 58 años de amor",

        "",

        `Familia / Invitado: ${
            confirmation.family
        }`,

        `Código: ${
            confirmation.code
        }`,

        `Confirma: ${
            payload.confirmedBy
        }`,

        `¿Asistirá?: ${
            confirmation.attendance
        }`,

        `Personas confirmadas: ${
            confirmation.confirmedGuests
        }`,

        `Lugares reservados: ${
            confirmation.reservedPlaces
        }`
    ];

    if (payload.message) {

        messageLines.push(
            `Mensaje: ${payload.message}`
        );
    }

    const whatsappUrl =
        `https://api.whatsapp.com/send` +
        `?phone=${whatsappNumber}` +
        `&text=${encodeURIComponent(
            messageLines.join("\n")
        )}`;

    whatsappConfirmationLink.href =
        whatsappUrl;

    whatsappConfirmationLink.hidden =
        false;
}


/* ==========================================
   INICIALIZACIÓN
========================================== */

loadInvitation();

/* ==========================================
   VISOR DE FOTOGRAFÍAS
========================================== */

const imageModal =
    document.getElementById("image-modal");

const imageModalPhoto =
    document.getElementById("image-modal-photo");

const imageModalClose =
    document.getElementById("image-modal-close");

const timelinePhotos =
    document.querySelectorAll(".timeline-photo");

function openImageModal(photoButton) {

    if (
        !imageModal ||
        !imageModalPhoto
    ) {
        return;
    }

    const image =
        photoButton.querySelector("img");

    if (!image) {
        return;
    }

    imageModalPhoto.src =
        image.getAttribute("src");

    imageModalPhoto.alt =
        image.getAttribute("alt") ||
        "Fotografía ampliada";

    imageModal.hidden = false;

    document.body.style.overflow =
        "hidden";
}

function closeImageModal() {

    if (!imageModal) {
        return;
    }

    imageModal.hidden = true;

    if (imageModalPhoto) {
        imageModalPhoto.src = "";

    }

    document.body.style.overflow = "";
}

timelinePhotos.forEach(
    (photoButton) => {

        photoButton.addEventListener(
            "click",
            () => openImageModal(photoButton)
        );
    }
);

if (imageModalClose) {

    imageModalClose.addEventListener(
        "click",
        closeImageModal
    );
}

if (imageModal) {

    imageModal.addEventListener(
        "click",
        (event) => {

            if (event.target === imageModal) {
                closeImageModal();
            }
        }
    );
}

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            imageModal &&
            !imageModal.hidden
        ) {
            closeImageModal();
        }
    }
);