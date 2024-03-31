import { randomRange } from "../../utils/MathUtils";

export class RotatingArc {
    constructor(x, y, length, startAngle, endAngle, lineWidth = 2) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.lineWidth = lineWidth; // Ajout de la largeur de trait
        this.vAngular = 0; // vitesse angulaire
    }

    update(elapsedTime, speed = 1) {
        // Mise à jour de l'angle en fonction de la vitesse angulaire
        this.startAngle += this.vAngular * elapsedTime * speed;
        this.endAngle += this.vAngular * elapsedTime * speed;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + Math.cos(this.endAngle) * this.length, this.y + Math.sin(this.endAngle) * this.length);
        context.lineWidth = this.lineWidth; // Définition de la largeur de trait
        context.stroke();
        context.closePath();
    }
}
