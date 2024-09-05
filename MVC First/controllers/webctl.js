module.exports.home=async(req,res)=>{
   try{
        await res.render("home")
   }catch(err){
    console.log("Somethig went wrong to reach home page" + err);
    
   }
}
module.exports.about=async(req,res)=>{
    try{
         await res.render("about")
    }catch(err){
     console.log("Somethig went wrong to reach about page" + err);
     
    }
}
module.exports.contact=async(req,res)=>{
    try{
         await res.render("contact")
    }catch(err){
     console.log("Somethig went wrong to reach contact page" + err);
     
    }
}