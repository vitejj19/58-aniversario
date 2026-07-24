"use strict";


/* ==========================================
   CONFIGURACIÓN GENERAL
========================================== */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* ==========================================
   MOSTRAR TODOS LOS ELEMENTOS SIN ANIMACIÓN
========================================== */

function showAllAnimatedElements() {

    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            element.classList.add(
                "is-visible"
            );
        });

    document
        .querySelectorAll(".timeline-item")
        .forEach((item) => {

            item.classList.add(
                "is-visible"
            );
        });
}


/* ==========================================
   ANIMACIÓN GENERAL AL HACER SCROLL
========================================== */

function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!revealElements.length) {
        return;
    }

    /*
     * Si el navegador no soporta
     * IntersectionObserver o el usuario
     * prefiere reducir movimiento,
     * mostramos todo directamente.
     */

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );
            }
        );

        return;
    }

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -8% 0px"
            }
        );

    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );
        }
    );
}


/* ==========================================
   ACTIVAR ETAPAS DE NUESTRA HISTORIA
========================================== */

function initializeTimelineAnimations() {

    const timelineItems =
        Array.from(
            document.querySelectorAll(
                ".timeline-item"
            )
        );

    if (!timelineItems.length) {
        return;
    }

    /*
     * En modo de movimiento reducido,
     * dejamos todas las etapas visibles
     * y activamos la primera.
     */

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        timelineItems.forEach(
            (item, index) => {

                item.classList.add(
                    "is-visible"
                );

                item.classList.toggle(
                    "is-active",
                    index === 0
                );
            }
        );

        return;
    }

    /*
     * Activa la etapa que se encuentra
     * dentro de la zona central
     * de la pantalla.
     */

    const timelineObserver =
        new IntersectionObserver(
            (entries) => {

                const visibleEntries =
                    entries
                        .filter(
                            (entry) =>
                                entry.isIntersecting
                        )
                        .sort(
                            (
                                firstEntry,
                                secondEntry
                            ) =>
                                secondEntry
                                    .intersectionRatio -
                                firstEntry
                                    .intersectionRatio
                        );

                if (!visibleEntries.length) {
                    return;
                }

                const activeItem =
                    visibleEntries[0].target;

                timelineItems.forEach(
                    (item) => {

                        item.classList.toggle(
                            "is-active",
                            item === activeItem
                        );
                    }
                );
            },
            {
                threshold: [
                    0.15,
                    0.25,
                    0.35,
                    0.45,
                    0.55,
                    0.65
                ],

                rootMargin:
                    "-18% 0px -35% 0px"
            }
        );

    timelineItems.forEach(
        (item) => {

            timelineObserver.observe(
                item
            );
        }
    );
}


/* ==========================================
   ACTIVAR SECCIONES AL HACER SCROLL
========================================== */

function updateActiveSections() {

    const sections =
        Array.from(
            document.querySelectorAll(
                ".scroll-section"
            )
        );

    if (!sections.length) {
        return;
    }

    const referencePoint =
        window.innerHeight * 0.48;

    let activeSection = null;
    let shortestDistance = Infinity;

    sections.forEach(
        (section) => {

            const rectangle =
                section.getBoundingClientRect();

            const isVisible =
                rectangle.bottom > 0 &&
                rectangle.top <
                    window.innerHeight;

            if (!isVisible) {
                return;
            }

            const sectionCenter =
                rectangle.top +
                rectangle.height / 2;

            const distance =
                Math.abs(
                    sectionCenter -
                    referencePoint
                );

            if (
                distance <
                shortestDistance
            ) {

                shortestDistance =
                    distance;

                activeSection =
                    section;
            }
        }
    );

    sections.forEach(
        (section) => {

            section.classList.toggle(
                "is-active",
                section === activeSection
            );
        }
    );
}

function updateTimelineActiveItem() {

    const timelineItems =
        Array.from(
            document.querySelectorAll(
                ".timeline-item"
            )
        );

    if (!timelineItems.length) {
        return;
    }

    const viewportReference =
        window.innerHeight * 0.48;

    let closestItem = null;
    let closestDistance = Infinity;

    timelineItems.forEach(
        (item) => {

            const rectangle =
                item.getBoundingClientRect();

            const itemCenter =
                rectangle.top +
                rectangle.height / 2;

            const distance =
                Math.abs(
                    itemCenter -
                    viewportReference
                );

            const isNearViewport =
                rectangle.bottom > 0 &&
                rectangle.top <
                    window.innerHeight;

            if (
                isNearViewport &&
                distance < closestDistance
            ) {

                closestDistance =
                    distance;

                closestItem =
                    item;
            }
        }
    );

    if (!closestItem) {
        return;
    }

    timelineItems.forEach(
        (item) => {

            item.classList.toggle(
                "is-active",
                item === closestItem
            );
        }
    );
}


/* ==========================================
   CONTROL OPTIMIZADO DEL SCROLL
========================================== */

let timelineScrollFrame = null;

function handleTimelineScroll() {

    if (timelineScrollFrame) {
        return;
    }

    timelineScrollFrame =
        window.requestAnimationFrame(
            () => {

                updateActiveSections();

                updateTimelineActiveItem();

                timelineScrollFrame = null;
            }
        );
}


/* ==========================================
   EFECTO ESCALONADO EN TARJETAS
========================================== */

function applyRevealDelays() {

    const groupedSelectors = [
        ".timeline-item",
        ".gift-option",
        ".dress-code-card",
        ".event-card"
    ];

    groupedSelectors.forEach(
        (selector) => {

            document
                .querySelectorAll(selector)
                .forEach(
                    (element, index) => {

                        const delay =
                            Math.min(
                                index * 90,
                                360
                            );

                        element.style.setProperty(
                            "--reveal-delay",
                            `${delay}ms`
                        );
                    }
                );
        }
    );
}


/* ==========================================
   INICIALIZACIÓN
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyRevealDelays();

        initializeRevealAnimations();

        initializeTimelineAnimations();

        updateActiveSections();

        updateTimelineActiveItem();

        window.addEventListener(
            "scroll",
            handleTimelineScroll,
            {
                passive: true
            }
        );

        window.addEventListener(
            "resize",
            handleTimelineScroll,
            {
                passive: true
            }
        );
    }
);