import Scene from "../canvas/Scene";
import { RotatingArc } from "../canvas/shapes/arcs";

export default class Scenario extends Scene {
    constructor(id) {
        super(id);

        // gradations
        this.drawGradation();

        // arcs
        this.arcs = [];

        // Cadran de l'horloge
        const clockRadius = Math.min(this.width, this.height) * 0.4;
        const clockX = this.width / 2;
        const clockY = this.height / 2;
        const clockArc = new RotatingArc(clockX, clockY, clockRadius, 0, Math.PI * 2, 4); // Largeur de trait de 4
        clockArc.vAngular = 0.01; // Vitesse angulaire de rotation pour le cadran de l'horloge
        this.arcs.push(clockArc);

        // Aiguille des heures
        const hourHandLength = clockRadius * 0.5;
        const hourHand = new RotatingArc(clockX, clockY, hourHandLength, -Math.PI / 2, -Math.PI / 2, 4); // Largeur de trait de 4
        hourHand.vAngular = 0.002; // Vitesse angulaire de rotation pour l'aiguille des heures
        this.arcs.push(hourHand);

        // Aiguille des minutes
        const minuteHandLength = clockRadius * 0.7;
        const minuteHand = new RotatingArc(clockX, clockY, minuteHandLength, -Math.PI / 2, -Math.PI / 2, 2); // Largeur de trait de 2
        minuteHand.vAngular = 0.01; // Vitesse angulaire de rotation pour l'aiguille des minutes
        this.arcs.push(minuteHand);

        // debug
        this.params['line-width'] = 2;
        this.params.speed = 1;
        this.params.color = "#ffffff";
        if (this.debug.active) {
            this.debugFolder.add(this.params, 'line-width', 1, 10).onChange(() => this.drawUpdate());
            this.debugFolder.add(this.params, 'speed', -2, 2, .25);
            this.debugFolder.addColor(this.params, 'color');
        }
    }

    resize() {
        super.resize();

        // refresh
        this.drawUpdate();
    }

    update() {
        if (!super.update()) return;
        this.drawUpdate();
    }

    drawUpdate() {
        this.clear();

        // style
        this.context.lineCap = 'round';
        this.context.strokeStyle = this.params.color;
        this.context.lineWidth = this.params['line-width'];

        // draw
        if (!!this.arcs) {
            this.arcs.forEach(arc => {
                if (this.params["is-update"]) arc.update(this.globalContext.time.delta / 1000, this.params.speed);
                arc.draw(this.context);
            });
        }
    }

    drawGradation() {
        const nGradation_ = 12;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.4;

        // Dessiner le cercle central
        this.context.beginPath();
        this.context.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        this.context.fillStyle = 'white';
        this.context.fill();

        // Dessiner les marqueurs horaires
        for (let i = 0; i < nGradation_; i++) {
            const angle = (i - 3) * (Math.PI * 2) / 12;  // Décaler de 3 heures pour que 0 soit à midi
            const markerX = centerX + Math.cos(angle) * radius;
            const markerY = centerY + Math.sin(angle) * radius;

            // Dessiner le marqueur
            this.context.beginPath();
            this.context.arc(markerX, markerY, 5, 0, 2 * Math.PI);
            this.context.fillStyle = 'white';
            this.context.fill();

            // Dessiner le point au-dessus du marqueur
            const pointX = markerX + Math.cos(angle) * 10;
            const pointY = markerY + Math.sin(angle) * 10;
            this.context.beginPath();
            this.context.arc(pointX, pointY, 2, 0, 2 * Math.PI);
            this.context.fillStyle = 'white';
            this.context.fill();
        }
    }
}
