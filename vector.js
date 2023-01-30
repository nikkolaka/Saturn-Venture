class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;

    }


    add(v){
        return new Vector(this.x+v.x,this.y+v.y);
    }

    subtr(v){
        return new Vector(this.x-v.x,this.y-v.y);
    }


    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vector(this.x*n, this.y*n);
    }

    unit(){
        if(this.mag() === 0){
            return new Vector(0,0);
        } else{
            return new Vector(this.x/this.mag(), this.y/this.mag());
        }

    }


    drawVector(start_x, start_y, n, color, canvas){
        canvas.beginPath();
        canvas.moveTo(start_x, start_y);
        canvas.lineTo(start_x + this.x * n, start_y + this.y * n);
        canvas.strokeStyle = color;
        canvas.stroke();

    }

}