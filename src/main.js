import Scenario from "./js/scenarios/Scenario";

// Créez une instance de Scenario pour le canvas principal
const scene = new Scenario();

// Créez une instance de Scenario pour le canvas de l'horloge
const clockScene = new Scenario('clock-canvas');

// Assurez-vous d'appeler la méthode update() pour rafraîchir le dessin
function animate() {
    scene.update(); // Met à jour le dessin principal
    clockScene.update(); // Met à jour le dessin de l'horloge
    requestAnimationFrame(animate);
}

animate(); // Démarre l'animation
