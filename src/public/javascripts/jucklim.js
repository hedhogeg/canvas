import {
    Player, Enemy, Bullet
} from "./jucklim_objects.js"
const frame = document.getElementById('canvas_frame')

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
        this.pause = true
        this.milisecond = 0
        this.second = 0
        this.minute = 0
        this.timer
        this.player = new Player(this.stageW/2, this.stageH/2, 10, this.stageW, this.stageH, 3, 'black')
        const init_e = this.spawn(1)
        this.enemies = [init_e]
        this.dead_enemies = [0, 0, 0, 0]
        this.bullets = []
        //gaming
        this.spawning
        //event
        window.addEventListener('keydown', this.player.keyDown.bind(this.player))
        window.addEventListener('keydown', this.esckey.bind(this))
        window.addEventListener('keyup', this.player.keyUp.bind(this.player))
        this.canvas.addEventListener('click', (event) => {
            const current_bullet = new Bullet(this.player.x, this.player.y, event.offsetX, event.offsetY, 3, this.stageW, this.stageH, 5, 1, 'black')
            this.bullets.push(current_bullet)
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
        if (this.gaming && !this.pause) {
            this.ctx.clearRect(0, 0, this.stageW, this.stageH)
            this.player.update(this.ctx)
            this.bullets.forEach((b) => {
                b.update(this.ctx)
            })
            this.enemies.forEach((e) => {
                if (e.x < -51 || e.x > 51 + this.stageW || e.y < -51 || e.y > 51 + this.stageH) {
                    this.enemies.splice(this.enemies.indexOf(e), 1)
                } else {
                    if (e.health == 0) {
                        this.enemies.splice(this.enemies.indexOf(e), 1)
                        this.dead_enemies[e.level] += 1
                    } else {
                        const pedistance = Math.hypot(this.player.x - e.x, this.player.y - e.y)
                        if (pedistance <= this.player.radius + e.radius) {
                            this.endGame()
                        }
                        this.bullets.forEach((b) => {
                            if (!(b.x < -b.radius || b.x > b.radius + this.stageW || b.y < -b.radius || b.y > b.radius + this.stageH)) {
                                const bedistance = Math.hypot(b.x - e.x, b.y - e.y)
                                if (bedistance <= b.radius + e.radius) {
                                    e.health -= b.damage
                                    const bullet_index = this.bullets.indexOf(b)
                                    this.bullets.splice(bullet_index, 1)
                                }
                            } 
                        })
                        e.update(this.ctx)
                    }
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
        switch (level) {
            case 1:
                new_enemy = new Enemy(1, initial_pos[0], initial_pos[1], this.player.x, this.player.y, 20, this.stageW, this.stageH, 4, 1, 'green')
                break
            case 2:
                new_enemy = new Enemy(2, initial_pos[0], initial_pos[1], this.player.x, this.player.y, 40, this.stageW, this.stageH, 3, 2, 'blue')
                break
            case 3:
                new_enemy = new Enemy(3, initial_pos[0], initial_pos[1], this.player.x, this.player.y, 70, this.stageW, this.stageH, 2, 5, 'red')
        }

        return new_enemy
    }

    spawnEnemies() {
        if (this.gaming && !this.pause) {   
            for (let i=0;i<5;i++) {
                const current_enemy = this.spawn(1)
                this.enemies.push(current_enemy)
            }
        }
    }

    setTimer() {
        const timer = document.getElementById('timer_text')
        if (this.milisecond == 99) {
            this.second += 1
            this.milisecond = 0
        } else {
            this.milisecond += 1
        }
        if (this.second == 60) {
            this.minute += 1
            this.second = 0
        }
        timer.innerText = `${this.minute < 10 ? `0${this.minute}` : `${this.minute}`}:${this.second < 10 ? `0${this.second}` : `${this.second}`}.${this.milisecond < 10 ? `0${this.milisecond}` : `${this.milisecond}`}`
    }

    pauseGame() {
        if (this.gaming) {
            const esc_screen = document.getElementById('esc_screen')
            if (this.pause) {
                this.pause = false
                esc_screen.style.display = 'none'
                this.timer = setInterval(this.setTimer.bind(this), 10)
                this.spawning = setInterval(this.spawnEnemies.bind(this), 1000);
                this.animate()
            } else {
                this.pause = true
                esc_screen.style.display = 'flex'
                clearInterval(this.timer)
                clearInterval(this.spawning)
            }
        }
    }

    esckey(event) {
        if (event.key == 'Escape') {
            this.pauseGame()
        }
    }

    endGame() {
        clearInterval(this.timer)
        const end_screen = document.getElementById('end_screen')
        end_screen.style.display = 'block'
        this.gaming = false
        console.log(this.dead_enemies)
    }
}

window.onload = () => {
    const canvas = new Canvas()
    document.getElementById('game_start').addEventListener('click', canvas.pauseGame.bind(canvas))
}