import { Application } from '@pixi/app';
import { initAssets } from './utils/assets';
import { game } from './Game';

export const app = new Application<HTMLCanvasElement>({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0x000000,
});

function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    app.renderer.view.style.width = `${windowWidth}px`;
    app.renderer.view.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    app.renderer.resize(windowWidth, windowHeight);
    game.resize(windowWidth, windowHeight);
}

async function init() {
    document.body.appendChild(app.view); 

    await initAssets();

    game.init();

    window.addEventListener('resize', resize); 
    resize();

    app.ticker.add(() => {
        game.update();
    });
}

window.onload = init;