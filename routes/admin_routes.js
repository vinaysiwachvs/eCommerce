const express=require('express');
// const app = express();
const router =express.Router();


router.post("/admin/addproduct",(req,res)=>{
  
    res.send("succesfully added product")
})


router.delete("/admin/deleteproduct",(req,res)=>{
  
    res.send("succesfully delete product")
})

router.patch("/admin/updateproduct",(req,res)=>{
    console.log("function to update the product");
    res.send("updated successfully");
})

router.delete("/admin/deleteuser",(req,res)=>{
    res.send("user blocked / removed from database");
})


function getProductFromDB(id){
    return {"product1":1}
}
function addProductToDB(product){
    console.log("product added")
}


module.exports = router;
// product cost 