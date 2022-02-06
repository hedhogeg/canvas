export class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.vx = 0
        this.vy = 0
    }

    keyDown(event) {
        const key = event.key
        if (key == 'w') {
            // up
            this.vy = -1
        } else if (key == 'a') {
            // left
            this.vx = -1
        } else if (key == 's') {
            // down
            this.vy = 1
        } else if (key == 'd') {
            // right
            this.vx = 1
        }
    }

    keyUp(event) {
        const key = event.key
        if (key == 'w') {
            // up
            this.vy = 0
        } else if (key == 'a') {
            // left
            this.vx = 0
        } else if (key == 's') {
            // down
            this.vy = 0
        } else if (key == 'd') {
            // right
            this.vx = 0
        }
    }
    
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        this.x += this.vx
        this.y += this.vy
    }

}