const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


const width = canvas.width = 1024;
const height = canvas.height = 576;

c.fillRect(0, 0, width, height);
const gravity = .7;

class Sprite {
    constructor({position, velocity, size}){
        this.position = position;
        this.size = size
        this.velocity = velocity;
        this.lastKey;
        
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.size.height >= canvas.height){
            //🧠 2. Why not use == instead of >=?
            //✅ Problem with ==:
            //Rarely will this.position.y + this.size.height + velocity.y be exactly equal to canvas.height.
            this.velocity.y = 0
            // this.position.y = canvas.height
            //🧠 1. Why + this.velocity.y in the condition?
            //So using + velocity.y is a predictive collision check — it helps prevent 
            // the object from going slightly past the floor before stopping, which avoids 
            // visual glitches.
        }else{
            this.velocity.y += gravity;
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

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    },
}


// function movement(char, key, button1, button2){
//     if (keys.key.pressed && char.lastKey === button1){
//         char.velocity.x = -2
//     } else if (keys.key.pressed && char.lastKey === button2){
//         char.velocity.x = 2
//     }
// }

function movement(char, keysObj, key1, key2){
    if (keysObj[key1].pressed && char.lastKey === key1){
        char.velocity.x = -2
    } else if (keysObj[key2].pressed && char.lastKey === key2){
        char.velocity.x = 2
    }
}


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    
    movement(player, keys, 'a', 'd')
    movement(enemy, keys, 'arrowLeft', 'arrowRight')

    // movement(player, {a,d}, 'a', 'd')
    // movement(enemy, {arrowRight, arrowLeft}, 'ArrowRight', 'ArrowLeft')
    
    // if (keys.a.pressed && player.lastKey === 'a'){
    //     player.velocity.x = -2
    // } else if (keys.d.pressed && player.lastKey === 'd'){
    //     player.velocity.x = 2
    // }
 
    // if (keys.arrowLeft.pressed && enemy.lastKey === 'arrowLeft'){
    //     enemy.velocity.x = -2
    // } else if (keys.arrowRight.pressed && enemy.lastKey === 'arrowRight'){
    //     enemy.velocity.x = 2
    // }



}


document.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a'
        break
        case 'w':
            player.velocity.y = -20
            keys.w.pressed = true;
        break
        case 'ArrowRight':
            keys.arrowRight.pressed = true;
            enemy.lastKey = 'arrowRight'
        break
        case 'ArrowLeft':
            keys.arrowLeft.pressed = true;
            enemy.lastKey = 'arrowLeft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -20
            keys.arrowUp.pressed = true;
        break

    }
    console.log(e.key)
})

document.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break
        case 'w':
            player.velocity.y = 2; 
            keys.w.pressed = false;
        break
        case 'ArrowRight':
            keys.arrowRight.pressed = false;
        break
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false;
        break
        case 'ArrowUp':
            enemy.velocity.y = 2; 
            keys.arrowUp.pressed = false;
        break
    }
    console.log(e.key)
})



animate();