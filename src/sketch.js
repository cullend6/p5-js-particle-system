export default function sketch(p) {
    const particles = [];
    let forces = [];

    const height = 400;
    const width = 400;

    let amount = 0;
    
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        amount = props.amount;
        if (amount < particles.length) {
            particles.splice(amount);
        } else {
            for(let i = particles.length; i < amount; i++) {
                particles.push(new Particle(p.random(width), p.random(height), 0, 0));
            }
        }

        const newForces = props.forces;
        if (newForces.length < forces.length) {
            forces.splice(newForces.length);
        } else {            
            for (let i = forces.length; i < newForces.length; i++) {
                forces.push(p.createVector(newForces[i].x, newForces[i].y));
            }
        }

        console.log(forces)
    }

    p.setup = function () {
        p.createCanvas(width, height);
        for(let i = 0; i < amount; i++) {
            particles.push(new Particle(p.random(width), p.random(height), 0, 0));
        }
    }


    p.draw = function () {
        p.background('rgb(55, 100, 144)');
        particles.forEach(particle => {
            particle.render();
            particle.update();
        })
    }

    // p.mousePressed = function() {
    //     particles.forEach(particle => {
    //         particle.velocity.add(p.createVector(0, -50));
    //     })
    // }

    class Particle {
        constructor(posX, posY, velX, velY) {
            this.pos = p.createVector(posX, posY);
            this.velocity = p.createVector(velX, velY);
            this.size = 10;
        }

        render() {
            p.noStroke();
            p.circle(this.pos.x, this.pos.y, this.size);
        }

        update() {
            forces.forEach(force => this.velocity.add(force));
            this.pos.add(this.velocity);
            this.detectCollisions();
        }

        detectCollisions() {
            if (this.pos.y < 0 || this.pos.y > height) {
                this.velocity.y *= -1;
                this.pos.y = this.pos.y < 0 ? 0 : height;
            }
            if (this.pos.x < 0 || this.pos.x > width) {
                this.velocity.x *= -1;
                this.pos.x = this.pos.x < 0 ? 0 : width;
            }

            if (this.pos.y === height) this.velocity.x *= .9; // Friction with bottom of screen.
        }
    }
}