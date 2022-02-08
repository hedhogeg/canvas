export class Player {
    constructor(x, y, radius, stageWidth, stageHeight, color) {
        this.x = x
        this.y = y
        this.stageWidth = stageWidth
        this.stageHeight = stageHeight
        this.radius = radius
        this.color = color
        this.vx = 0
        this.vy = 0
        this.velocity = 5
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
        if (this.y < this.stageHeight - this.radius) {
            if (this.keys.down.pressed) {
                this.vy += this.velocity
            }
        }
        if (this.x > this.radius) {
            if (this.keys.left.pressed) {
                this.vx -= this.velocity
            }
        }
        if (this.x < this.stageWidth - this.radius) {
            if (this.keys.right.pressed) {
                this.vx += this.velocity
            }
        }
        this.x += this.vx
        this.y += this.vy
        this.draw(ctx)
    }
}