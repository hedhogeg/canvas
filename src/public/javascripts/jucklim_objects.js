export class Player {
    constructor(x, y, radius, stageW, stageH, velocity, color) {
        this.x = x
        this.y = y
        this.stageW = stageW
        this.stageH = stageH
        this.radius = radius
        this.color = color
        this.vx = 0
        this.vy = 0
        this.velocity = velocity
        this.keys = {
            up: {
                pressed: false
            },
            left: {
                pressed: false
            },
            down: {
                pressed: false
            },
            right: {
                pressed: false
            }
        }
    }

    keyDown(event) {
        const key = event.key
        if (key == 'w') {
            // up
            this.keys.up.pressed = true
        } else if (key == 'a') {
            // left
            this.keys.left.pressed = true
        } else if (key == 's') {
            // down
            this.keys.down.pressed = true
        } else if (key == 'd') {
            // right
            this.keys.right.pressed = true
        }
    }

    keyUp(event) {
        const key = event.key
        if (key == 'w') {
            // up
            this.keys.up.pressed = false
        } else if (key == 'a') {
            // left
            this.keys.left.pressed = false
        } else if (key == 's') {
            // down
            this.keys.down.pressed = false
        } else if (key == 'd') {
            // right
            this.keys.right.pressed = false
        }
    }
    
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    
    update(ctx) {
        this.vx = 0
        this.vy = 0
        if (this.y > this.radius) {
            if (this.keys.up.pressed) {
                this.vy -= this.velocity
            }
        }
        if (this.y < this.stageH - this.radius) {
            if (this.keys.down.pressed) {
                this.vy += this.velocity
            }
        }
        if (this.x > this.radius) {
            if (this.keys.left.pressed) {
                this.vx -= this.velocity
            }
        }
        if (this.x < this.stageW - this.radius) {
            if (this.keys.right.pressed) {
                this.vx += this.velocity
            }
        }
        this.x += this.vx
        this.y += this.vy
        this.draw(ctx)
    }
}

export class Enemy {
    constructor(level, x, y, px, py, radius, stageW, stageH, velocity, health, color) {
        this.level = level
        this.x = x
        this.y = y
        this.px = px
        this.py = py
        this.stageW = stageW
        this.stageH = stageH
        this.radius = radius
        this.dx = (this.px - this.x) / Math.hypot(this.px - this.x, this.py - this.y)
        this.dy = (this.py - this.y) / Math.hypot(this.px - this.x, this.py - this.y)
        this.velocity = velocity
        this.health = health
        this.color = color
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    update(ctx) {
        this.x += this.dx * this.velocity
        this.y += this.dy * this.velocity
        this.draw(ctx)
    }
}

export class Bullet {
    constructor(x, y, px, py, radius, stageW, stageH, velocity, damage, color) {
        this.x = x
        this.y = y
        this.px = px
        this.py = py
        this.stageW = stageW
        this.stageH = stageH
        this.radius = radius
        this.dx = (this.px - this.x) / Math.hypot(this.px - this.x, this.py - this.y)
        this.dy = (this.py - this.y) / Math.hypot(this.px - this.x, this.py - this.y)
        this.velocity = velocity
        this.damage = damage
        this.color = color
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    update(ctx) {
        this.x += this.dx * this.velocity
        this.y += this.dy * this.velocity
        this.draw(ctx)
    }
}