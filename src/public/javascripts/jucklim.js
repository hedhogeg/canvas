import {
    Player, Enemy, Bullet
} from "./jucklim_objects.js"
const frame = document.getElementById('canvas_frame')
let canvas

// Canvas
class Canvas {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        frame.appendChild(this.canvas)
        //resize
        window.addEventListener('resize', this.resize.bind(this))
        this.resize()
        //initial game setting
        this.gaming = true
        this.player = new Player(this.stageW/2, this.stageH/2, 10, this.stageW, this.stageH, 3, 'black')
        const init_e = this.spawn(1)
        this.enemies = [init_e]
        this.dead_enemies = 0
        this.bullets = []
        //gaming
        setInterval(() => {
            const level = Math.ceil(Math.random() * 3)
            const current_enemy = this.spawn(level)
            this.enemies.push(current_enemy)
        }, 1000);
        setInterval(() => {
            this.bullets.shift()
        }, 5000);
        //event
        window.addEventListener('keydown', this.player.keyDown.bind(this.player))
        window.addEventListener('keyup', this.player.keyUp.bind(this.player))
        this.canvas.addEventListener('click', (event) => {
            const current_bullet = new Bullet(this.player.x, this.player.y, event.offsetX, event.offsetY, 3, this.stageW, this.stageH, 5, 1, 'black')
            this.bullets.push(current_bullet)
            console.log(this.bullets)
        })
        //canvas frame
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
            this.ctx.clearRect(0, 0, this.stageW, this.stageH)
            this.player.update(this.ctx)
            this.bullets.forEach((b) => {
                b.update(this.ctx)
            })
            this.enemies.forEach((e) => {
                if (e.health) {
                    const pedistance = Math.hypot(this.player.x - e.x, this.player.y - e.y)
                    if (pedistance <= this.player.radius + e.radius) {
                        this.endGame()
                    }
                    this.bullets.forEach((b) => {
                        const bedistance = Math.hypot(b.x - e.x, b.y - e.y)
                        if (bedistance <= b.radius + e.radius) {
                            e.health -= b.damage
                            const bullet_index = this.bullets.indexOf(b)
                            this.bullets.splice(bullet_index, 1)
                        }
                        
                    })
                    e.update(this.ctx)
                } else {
                    
                }
            })
            window.requestAnimationFrame(this.animate.bind(this))
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

    endGame() {
        alert("You Died")
        this.gaming = false
    }
}

window.onload = () => {
    canvas = new Canvas()
}