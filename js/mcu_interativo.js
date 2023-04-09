
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


// Event Listeners
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.radians = Math.random() * Math.PI * 2
        this.velocity = 0.05
        this.mcuRadius = Math.random
        this.frequency = 0
        this.period = 0

        this.update = () => {
            const variables = {
                radius : document.querySelector('input#radius').value, 
                veloc : document.querySelector('input#veloc').value*0.01
            }
            this.velocity = variables.veloc
            this.mcuRadius = variables.radius

            this.radians += this.velocity
            this.x = x + Math.cos(this.radians) * this.mcuRadius
            this.y = y + Math.sin(this.radians) * this.mcuRadius

            this.period = (2*Math.PI)/(this.velocity/0.01)
            this.frequency = 1/this.period

            document.querySelector('#periodo').innerHTML = 'Período: ' + this.period + ' segundos'
            document.querySelector('#frequencia').innerHTML = 'Frequência: ' +this.frequency + ' htz'

            this.draw()
        }

        this.draw = () => {
            const cosX = Math.cos(this.radians)
            const sinY = Math.sin(this.radians)

            c.beginPath()
            c.arc(x, y, this.mcuRadius, 0, 2*Math.PI)
            c.strokeStyle = 'black'
            c.stroke()

            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
            c.closePath()

            c.beginPath()
            c.arc(x, y, 5, 0, Math.PI * 2, false)
            c.fillStyle = 'black'
            c.fill()
            c.closePath()

            let theta = Math.atan(60/this.mcuRadius)
            let h = Math.sqrt(this.mcuRadius*this.mcuRadius + 1700)
            drawArrow(c, this.x, this.y, x + h*Math.cos(theta+this.radians), y + h*Math.sin(theta+this.radians), 3, '#9E4784')
            drawArrow(c, this.x - cosX*this.radius+2, this.y - sinY*this.radius+2, x + cosX*6, y + sinY*6, 3, '#66347F')
        }
        
        function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
            //variables to be used when creating the arrow
            var headlen = 10;
            var angle = Math.atan2(toy-fromy,tox-fromx);
        
            ctx.save();
            ctx.strokeStyle = color;
        
            //starting path of the arrow from the start square to the end square
            //and drawing the stroke
            ctx.beginPath();
            ctx.moveTo(fromx, fromy);
            ctx.lineTo(tox, toy);
            ctx.lineWidth = arrowWidth;
            ctx.stroke();
        
            //starting a new path from the head of the arrow to one of the sides of
            //the point
            ctx.beginPath();
            ctx.moveTo(tox, toy);
            ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                    toy-headlen*Math.sin(angle-Math.PI/7));
        
            //path from the side point of the arrow, to the other side point
            ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
                    toy-headlen*Math.sin(angle+Math.PI/7));
        
            //path from the side point back to the tip of the arrow, and then
            //again to the opposite side point
            ctx.lineTo(tox, toy);
            ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                    toy-headlen*Math.sin(angle-Math.PI/7));
        
            //draws the paths created above
            ctx.stroke();
            ctx.restore();
        }
    }
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 1; i++) {
        particles.push( new Particle(canvas.width/2, canvas.height/2, 10, '#9E4784') )
    }
    console.log(particles)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update();
    });
}

init()
animate()
