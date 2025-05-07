const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


const width = canvas.width = 1024;
const height = canvas.height = 576;

c.fillRect(0, 0, width, height);
const gravity = .2;

class Sprite {
    constructor({position, velocity, size}){
        this.position = position;
        this.size = size
        this.velocity = velocity;
        
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        
        if (this.position.y + this.size.height >= canvas.height){
            //🧠 2. Why not use == instead of >=?
            //✅ Problem with ==:
            //Rarely will this.position.y + this.size.height + velocity.y be exactly equal to canvas.height.
            this.velocity.y = 0
            //🧠 1. Why + this.velocity.y in the condition?
            //So using + velocity.y is a predictive collision check — it helps prevent 
            // the object from going slightly past the floor before stopping, which avoids 
            // visual glitches.
        }else{
            this. velocity.y += gravity;
        }
    }

}

const player = new Sprite(
    {
        position:{
            x: 100,
            y: 0
        },
        velocity: {
           x: 0,
           y: 0
        },
        size: {
            width: 50,
            height: 150
        }
    }
);

const enemy = new Sprite(
    { 
        position: {
            x: 700,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        size: {
            width: 50,
            height: 150
        }
    }
)


document.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
            player.velocity.x = 1
        break
    }
    console.log(e.key)
})

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate();