import { Application } from '@pixi/app';
import { LoadingScene } from "./scenes/LoadingScene";
import { initAssets, isBundleLoaded, loadAssets } from './utils/assets';
import { SCENE } from './utils/enums';
import { Scene } from './utils/interfaces';

interface AppScreenConstructor {
    new (data?: any): Scene;
    assetBundles?: string[];
}

class Game {
    activeScene!: Scene;
    scenes: Map<SCENE, Scene> = new Map();

    constructor() {
        window.onload = () => this.init();
    }

    async init() {
        document.body.appendChild(app.view); 
    
        await initAssets();

        this.addScene(SCENE.loading, LoadingScene);
        await this.showScene(SCENE.loading);

        window.addEventListener('resize', () => this.resize()); 
        this.resize();

        app.ticker.add(this.update, this);
    }

    addScene(name: SCENE, scene: AppScreenConstructor) {
        this.scenes.set(name, new scene());
    }

    async showScene(scene: SCENE) {
        if (!this.scenes.has(scene)) {
            throw new Error(`Scene ${scene} not found`);
        }

        if (this.activeScene === this.scenes.get(scene)) {
            return;
        }

        if (!isBundleLoaded(scene)) {
            this.showScene(SCENE.loading);
            await loadAssets(scene);
        }

        if (this.activeScene) {
            app.stage.removeChild(this.activeScene);
        }

        this.activeScene = this.scenes.get(scene)!;

        app.stage.addChild(this.scenes.get(scene)!);
    }

    resize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        app.renderer.view.style.width = `${windowWidth}px`;
        app.renderer.view.style.height = `${windowHeight}px`;
        window.scrollTo(0, 0);

        app.renderer.resize(windowWidth, windowHeight);

        console.log(this.activeScene);

        if (this.activeScene?.resize) {
            this.activeScene.resize(windowWidth, windowHeight);
        }
    }

    update() {
        if (this.activeScene?.update) {
            this.activeScene.update();
        }
    }
}

export const app = new Application<HTMLCanvasElement>({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0x000000,
});

export const game = new Game();