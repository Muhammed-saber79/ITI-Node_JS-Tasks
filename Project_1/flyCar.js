const carClass=require("./carModule");

module.exports=class FlyingCar extends carClass{
    constructor(model,year){
        super(model,year);
        this.canFly=true;
    }

    carData(){
        return `${super.carData()} I Can Fly`
    }
}