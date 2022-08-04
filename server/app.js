const { Controller } = require("./components/controller");
//Start server
const PORT = 80;
Controller.listen(PORT,() =>{
    console.log(`Server running on port: ${PORT}`)
})