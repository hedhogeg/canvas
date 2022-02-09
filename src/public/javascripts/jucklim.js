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
        
        this.gaming = true
        this.player = new Player(this.stageW/2, this.stageH/2, 10, this.stageW, this.stageH, 'black')
        const init_e = this.spawn(1)
        this.enemies = [init_e]
        setInterval(() => {
            const level = Math.ceil(Math.random() * 3)
            const current_enemy = this.spawn(level)
            this.enemies.push(current_enemy)
        }, 2000);

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
        if (this.gaming) {
            window.requestAnimationFrame(this.animate.bind(this))
            this.ctx.clearRect(0, 0, this.stageW, this.stageH)
            this.player.update(this.ctx)
            this.enemies.forEach((e) => {
                const pedistance = Math.hypot(this.player.x - e.x, this.player.y - e.y)
                if (pedistance <= this.player.radius + e.radius) {
                    alert("boom")
                    this.gaming = false
                }
                e.update(this.ctx)
            })
        }
    }

    randomInitPosition() {
        const row = Math.floor(Math.random() * 4)
        let pos = [0, 0]
        if (row == 1) {
            pos[0] = Math.floor(Math.random() * this.stageW)
            pos[1] = -50
        } else if (row == 2) {
            pos[0] = Math.floor(Math.random() * this.stageW)
            pos[1] = this.stageH + 50
        } else if (row == 3) {
            pos[0] = -50
            pos[1] = Math.floor(Math.random() * this.stageH)
        } else {
            pos[0] = this.stageW + 50
            pos[1] = Math.floor(Math.random() * this.stageH)
        }

        return pos
    }

    spawn(level) {
        const initial_pos = this.randomInitPosition()
        let new_enemy
        if (level == 1) {
            new_enemy = new Enemy(initial_pos[0], initial_pos[1], this.player.x, this.player.y, 20, this.stageW, this.stageH, 4, 1, 'green')
        } else if (level == 2) {
            new_enemy = new Enemy(initial_pos[0], initial_pos[1], this.player.x, this.player.y, 40, this.stageW, this.stageH, 3, 2, 'blue')
        } else if (level == 3) {
            new_enemy = new Enemy(initial_pos[0], initial_pos[1], this.player.x, this.player.y, 70, this.stageW, this.stageH, 2, 5, 'red')
        }

        return new_enemy
    }
}

window.onload = () => {
    const canvas = new Canvas()
}