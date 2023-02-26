module.exports=class Car{
    constructor(model,year){
        this.model=model;
        this.year=year;
    }

    carData(){
        return `Car model is ${this.model} and car year is ${this.year}`;
    }
}