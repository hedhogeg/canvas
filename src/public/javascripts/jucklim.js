import {
    Player
} from "./jucklim_objects.js"
const frame = document.getElementById('canvas_frame')

// Canvas
class Canvas {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        frame.appendChild(this.canvas)
        
        window.addEventListener('resize', this.resize.bind(this))
        this.resize()
        
        this.player = new Player(this.stageWidth/2, this.stageHeight/2, 10, 'red')
        window.addEventListener('keydown', this.player.keyDown.bind(this.player))
        window.addEventListener('keyup', this.player.keyUp.bind(this.player))

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = frame.clientWidth
        this.stageHeight = frame.clientHeight

        this.canvas.width = this.stageWidth * 2
        this.canvas.height = this.stageHeight * 2
        this.ctx.scale(2, 2)
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        this.player.draw(this.ctx)
    }
}

window.onload = () => {
    new Canvas()
}