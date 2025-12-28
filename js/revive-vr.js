/* ==========================================================================
   ReVive VR – JS
   ========================================================================== */


const scene = document.querySelector("a-scene");

scene.addEventListener("loaded", () => {

    // Hotspots Entities
    const entityPhotoIntroduction = document.querySelector("#entityPhotoIntroduction");
    const entityPhotoIntroductionButton = document.querySelector("#entityPhotoIntroductionButton");
    const entityRainBells = document.querySelector("#entityRainBells");
    const entityRain = document.querySelector("#entityRain");
    const entityChurchBells = document.querySelector("#entityChurchBells");
    const entityChristmasSound = document.querySelector("#entityChristmasSound");
    const entityKitchen = document.querySelector("#entityKitchen");
    const entityNeighbours = document.querySelector("#entityNeighbours");
    const entityFireplaceFire = document.querySelector("#entityFireplaceFire");
    const entityFolkSong = document.querySelector("#entityFolkSong");

    const hotspotMarker = document.querySelector("#hotspotMarker");
    const hotspotMarkerHearth = document.querySelector("#hotspotMarkerHearth");

    // Visited hotspots tracking (7 required)
    const REQUIRED_HOTSPOT_IDS = [
        "hotspotPhotoIntroduction",
        "hotspotRainBells",
        "hotspotChristmasSound",
        "hotspotKitchen",
        "hotspotNeighbours",
        "hotspotFireplaceFire",
        "hotspotFolkSong",
    ];
    const visitedHotspots = new Set();

    // Marker state (locked until all 7 are visited)
    let markerUnlocked = false;

    // Mark a hotspot as visited and unlock marker when all are visited
    function markHotspotVisited(hotspotId) {
        if (!REQUIRED_HOTSPOT_IDS.includes(hotspotId)) return;

        visitedHotspots.add(hotspotId);

        if (visitedHotspots.size === REQUIRED_HOTSPOT_IDS.length) {
            console.log("✅ All 7 hotspots visited");

            markerUnlocked = true;

            if (hotspotMarker) {
                hotspotMarker.setAttribute("visible", true);
                hotspotMarkerHearth.classList.add("clickable");
            }
        }
    }

    scene.addEventListener("click", () => {

        entityPhotoIntroductionButton.setAttribute("visible", false);
        entityPhotoIntroductionButton.classList.remove("clickable");

        document.querySelectorAll('[id^="hotspot"]').forEach(h => {
            if (h.id === "hotspotMarker") return;
            h.setAttribute("visible", true);
            h.classList.add("clickable");
        });
    })

    // Marker navigation only when unlocked + on click (not on mouseenter)
    hotspotMarkerHearth.addEventListener("mouseenter", () => {
        if (!markerUnlocked) return;
        window.location.href = "revive-ar.html";
    });

    hotspots();

    function hotspots() {
        const hotspots = document.querySelectorAll('[id^="hotspot"]');

        hotspots.forEach(hotspot => {

            if (hotspot.dataset.eventsAttached) return;
            hotspot.dataset.eventsAttached = "true";

            switch (hotspot.id) {

                // Photo Introducion
                case "hotspotPhotoIntroduction":

                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        entityPhotoIntroduction.setAttribute("visible", true);
                    });

                    hotspot.addEventListener("mouseleave", () => {
                        entityPhotoIntroduction.setAttribute("visible", false);
                    });
                    break;

                // Rain and Bell Church
                case "hotspotRainBells":

                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        safePlay(entityRain);
                        safePlay(entityChurchBells);
                        entityRainBells.setAttribute("visible", true);
                    });

                    hotspot.addEventListener("mouseleave", () => {
                        safeStop(entityRain);
                        safeStop(entityChurchBells);
                        entityRainBells.setAttribute("visible", false);
                    });

                    break;

                // CHRISTMAS Sound
                case "hotspotChristmasSound":

                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        safePlay(entityChristmasSound);
                        entityChristmasSound.setAttribute("visible", true);
                    });

                    hotspot.addEventListener("mouseleave", () => {
                        safeStop(entityChristmasSound);
                        entityChristmasSound.setAttribute("visible", false);
                    });

                    break;

                // Kitchen
                case "hotspotKitchen":

                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        safePlay(entityKitchen);
                        entityKitchen.setAttribute("visible", true);
                    });

                    hotspot.addEventListener("mouseleave", () => {
                        safeStop(entityKitchen);
                        entityKitchen.setAttribute("visible", false);
                    });

                    break;

                // Neighbours
                case "hotspotNeighbours":
                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        safePlay(entityNeighbours);
                        entityNeighbours.setAttribute("visible", true);
                    });
                    hotspot.addEventListener("mouseleave", () => {
                        safeStop(entityNeighbours);
                        entityNeighbours.setAttribute("visible", false);
                    });
                    break;

                // Fireplace Fire
                case "hotspotFireplaceFire":
                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        safePlay(entityFireplaceFire);
                        entityFireplaceFire.setAttribute("visible", true);
                    });
                    hotspot.addEventListener("mouseleave", () => {
                        safeStop(entityFireplaceFire);
                        entityFireplaceFire.setAttribute("visible", false);
                    });
                    break;

                // Folk Song
                case "hotspotFolkSong":
                    hotspot.addEventListener("mouseenter", () => {
                        markHotspotVisited(hotspot.id);
                        safePlay(entityFolkSong);
                        entityFolkSong.setAttribute("visible", true);
                    });
                    hotspot.addEventListener("mouseleave", () => {
                        safeStop(entityFolkSong);
                        entityFolkSong.setAttribute("visible", false);
                    });
                    break;

                default:
                    break;
            }
        });
    }

    // Texts
    // Photo Introduction Text
    const entityPhotoIntroductionText = document.querySelector(
        "#entityPhotoIntroductionText"
    );
    const entityPhotoIntroductionTextTroika =
        "Era 1953. La lluvia caía sin descanso y el invierno helaba las calles, " +
        "pero esta casa humilde era un refugio.\n\n" +
        "Teodoro y María, rodeados de lo poco que tenían, " +
        "les regalaban a sus hijos algo inmensamente grande: amor, cuidado y cariño.\n\n" +
        "El padre cortó un árbol que los niños adornaron con motivos navideños hechos a mano, " +
        "y la madre tejió unos calcetines donde, al llegar la noche, dejarían algunos caramelos para sus hijos.\n\n" +
        "Aquí no había abundancia material, pero sí lo suficiente para que la felicidad creciera, sencilla y honesta, " +
        "como una estrella que no cambia el cielo, pero guía el camino.\n\n" +
        "Teresa, Lola y Tomás eran felices porque tenían lo más importante: el amor de sus padres.";

    entityPhotoIntroductionText.setAttribute(
        "troika-text",
        "value",
        entityPhotoIntroductionTextTroika
    );

    // Christmas Sound Text
    const entityChristmasSoundText = document.querySelector(
        "#entityChristmasSoundText"
    );

    const entityChristmasSoundTextTroika =
        "En casa de Teodoro y María siempre había música. Incluso en los días más difíciles, " +
        "las canciones llenaban la estancia y hacían más cálido el invierno.\n\n" +
        "Y cuando llegaba la Navidad, los villancicos no podían faltar: " +
        "eran una forma sencilla de celebrar juntos, de recordar que la alegría también se comparte.";

    entityChristmasSoundText.setAttribute(
        "troika-text",
        "value",
        entityChristmasSoundTextTroika
    );

    // Kitchen Text
    const entityKitchenText = document.querySelector(
        "#entityKitchenText"
    );

    const entityKitchenTextTroika =
        "Teresa, Lola y hasta el pequeño Tomás participaban con ilusión en aquel gesto cotidiano. " +
        "\n" +
        "Entre risas contenidas y miradas cómplices, aprendían que poner la mesa era también una forma de estar juntos, " +
        "de hacer hogar, de convertir lo sencillo en algo lleno de sentido.";

    entityKitchenText.setAttribute(
        "troika-text",
        "value",
        entityKitchenTextTroika
    );


    // Neighbours Text
    const entityNeighboursText = document.querySelector(
        "#entityNeighboursText"
    );

    const entityNeighboursTextTroika =
        "En la casa siempre había vecinos. " +
        "Las visitas no se anunciaban y las conversaciones nacían en la cocina o junto al fuego.\n\n" +
        "La comunidad existía de verdad: se compartía el pan, el tiempo y las preocupaciones. " +
        "En aquellos años, las puertas no se cerraban con llave, " +
        "porque la confianza era parte de la vida cotidiana.";

    entityNeighboursText.setAttribute(
        "troika-text",
        "value",
        entityNeighboursTextTroika
    )

    // Folk Song Text
    const entityFolkSongText = document.querySelector(
        "#entityFolkSongText"
    );

    const entityFolkSongTextTroika =
        "En aquella época, las celebraciones solían terminar cantando canciones muy antiguas y tradicionales. " +
        "Melodías transmitidas de generación en generación, que llenaban la casa de voces y recuerdos.\n\n" +
        "Hoy muchas de esas canciones se han perdido, pero entonces formaban parte natural de la vida y de la forma de celebrar juntos.";

    entityFolkSongText.setAttribute(
        "troika-text",
        "value",
        entityFolkSongTextTroika
    );


    // Rain + Bells Text
    const entityRainBellsText = document.querySelector(
        "#entityRainBellsText"
    );

    const entityRainBellsTextTroika =
        "A Teresa le encantaba mirar por la ventana en los días de lluvia, " +
        "mientras el sonido de las campanas de la vieja iglesia se mezclaba con el caer del agua.\n\n" +
        "Eran momentos sencillos, pero quedaron grabados para siempre en su memoria.";

    entityRainBellsText.setAttribute(
        "troika-text",
        "value",
        entityRainBellsTextTroika
    );

    // Fireplace Fire Text
    const entityFireplaceFireText = document.querySelector(
        "#entityFireplaceFireText"
    );

    const entityFireplaceFireTextTroika =
        "En las noches de frío invernal, la chimenea encendida reunía a la familia en conversaciones sencillas y cercanas.";

    entityFireplaceFireText.setAttribute(
        "troika-text",
        "value",
        entityFireplaceFireTextTroika
    );


    // Helper Functions

    // Unlock AudioContext
    const unlockAudioContext = async () => {
        const ctx = AFRAME.audioContext;
        if (ctx && ctx.state !== "running") {
            try {
                await ctx.resume();
            } catch (e) { }
        }
    };

    scene.addEventListener("touchstart", unlockAudioContext, {
        once: true,
    });
    scene.addEventListener("click", unlockAudioContext, { once: true });

    // play/stop + wait sound-loaded
    const waitForSoundLoaded = (entity, timeoutMs = 8000) => {
        return new Promise((resolve, reject) => {
            if (!entity || !entity.components || !entity.components.sound) {
                reject(new Error("Sound component not ready"));
                return;
            }

            // A-Frame sound component sets `loaded` when buffer is ready
            if (entity.components.sound.loaded) {
                resolve(true);
                return;
            }

            const onLoaded = () => {
                cleanup();
                resolve(true);
            };

            const timer = setTimeout(() => {
                cleanup();
                reject(new Error("Timeout waiting sound-loaded"));
            }, timeoutMs);

            const cleanup = () => {
                clearTimeout(timer);
                entity.removeEventListener("sound-loaded", onLoaded);
            };

            entity.addEventListener("sound-loaded", onLoaded);
        });
    };

    const safePlay = async (entity) => {
        await unlockAudioContext();

        // Asegura que el componente exista
        if (!entity?.components?.sound) return;

        // Espera a que esté cargado (especialmente importante para MP3)
        try {
            await waitForSoundLoaded(entity, 8000);
        } catch (e) {
            // Reintento: a veces ayuda "re-asignar" el src para forzar carga
            const current = entity.getAttribute("sound");
            entity.setAttribute("sound", "src", current.src);
            try {
                await waitForSoundLoaded(entity, 8000);
            } catch (e2) {
                console.warn("Audio not loaded:", e2);
                return;
            }
        }

        entity.components.sound.playSound();
    };

    const safeStop = (entity) => {
        if (entity?.components?.sound) {
            entity.components.sound.stopSound();
        }
    };

});
