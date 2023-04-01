import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Scene } from "../utils/interfaces";

export class LoadingScene extends Container implements Scene {
    private logo: Sprite;

    constructor() {
        super();

        this.logo = Sprite.from('pixi-logo');
        this.logo.anchor.set(0.5);
        this.addChild(this.logo);
    }

    update() {
        this.logo.rotation += 0.01;
    }

    resize(width: number, height: number) {
        this.logo.x = width / 2;
        this.logo.y = height / 2;
    }
}