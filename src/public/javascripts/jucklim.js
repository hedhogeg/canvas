import {
    Player, Enemy
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
        
        this.player = new Player(this.stageW/2, this.stageH/2, 10, this.stageW, this.stageH, 'red')
        this.e_list = []

        window.addEventListener('keydown', this.player.keyDown.bind(this.player))
        window.addEventListener('keyup', this.player.keyUp.bind(this.player))

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageW = frame.clientWidth
        this.stageH = frame.clientHeight

        this.canvas.width = this.stageW * 2
        this.canvas.height = this.stageH * 2
        this.ctx.scale(2, 2)
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.stageW, this.stageH)
        this.player.update(this.ctx)
    }
}

window.onload = () => {
    const canvas = new Canvas()
}