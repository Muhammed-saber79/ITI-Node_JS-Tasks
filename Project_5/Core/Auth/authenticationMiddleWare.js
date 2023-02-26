const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
    try{
        let token=request.get("authorization").split(" ")[1];
        let decodedToken=jwt.verify(token,"OSMans")
        request.id=decodedToken.id;
        request.role=decodedToken.role;
        // console.log(tokenObj);
        next();
    }catch(error){
        error.status=401;
        error.message="u are not authenticated...!";
        next(error);
    }
}

module.exports.checkAdmin=(request,response,next)=>{
    if(request.role=="Admin"){
        next();
    }else{
        let error=new Error("Not Authorized(u are not admin)...!");
        error.status=403;
        next(error);
    }
}

module.exports.checkAdminEmployee=(request,response,next)=>{
    if(request.role=="Admin" || request.role=="employee"){
        next();
    }else{
        let error=new Error("Not Authorized...!");
        error.status=403;
        next(error);
    }
}