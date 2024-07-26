const ff = require("fs").promises

async function CreateFile () {
    try{
       await ff.writeFile("demo2.txt", "this file created with async await")
        console.log("file created")
    }
    catch(err){
        console.log(err)
    }
}

CreateFile()