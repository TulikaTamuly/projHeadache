class milkBottle{
    constructor(){
        this.image=loadImage("Milk.png")
    }
    disAppear(){
        this.image=null

    }
    display(x,y){
        if(this.image){
        image(this.image,x,y,50,50)
        }
    }
}
