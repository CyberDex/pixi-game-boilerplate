import { Container } from "@pixi/display";
import { app } from "./main";
import { Sprite } from "@pixi/sprite";

class Game extends Container {
    private logo!: Sprite;

    init() {
        app.stage.addChild(this);

        this.logo = Sprite.from('pixi-logo');
        this.logo.anchor.set(0.5);

        this.addChild(this.logo);
    }

    resize(width: number, height: number) {
        this.logo.x = width / 2;
        this.logo.y = height / 2;
    }

    update() {
        this.logo.rotation += 0.01;
    }
}

export const game = new Game();
