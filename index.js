const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("."));

app.listen(8080);

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


app.get("/demo/:id", async (req, res) =>{ 
    let {id} = req.params;
    let data = await prisma.food.findMany({
        include:{
            food_type: true,
            user : true
        }, where:{
            // food_name:{
            //     contains: "w"
            // }
            food_id: Number(id)
        }
    });
    res.send(data);
})

app.post("/createFood", async (req, res) =>{
    let {food_name, image, price, desc, type_id} = req.body;
    await prisma.food.create({data:{food_name, image, price, desc, type_id}});
    await prisma.food.update ({
        data:{
            food_name, image, price, desc, type_id
        }, where:{food_id: 1}
    })
})
