const express = require('express');

const users = [
    {
        name : "John",
        kidneys: [{
            healthy: false
        }]
    }
]

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.get("/", function(req, resp) {
    const johnKidneys = users[0].kidneys;
    const numOfKidneys = johnKidneys.length;
    const numOfKidneysHealthy = johnKidneys.filter(el => el.healthy).length;
    const numOfUnhealthyKidneys = numOfKidneys - numOfKidneysHealthy;
    resp.json({
         numOfKidneys, numOfKidneysHealthy, numOfUnhealthyKidneys
    })
})

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        status: "SUCCESS"
    })
})

app.put("/", (req, res) => {
    const healthy = users[0].kidneys.filter(el => !el.healthy);
    if(!isThereAnyUnhealthyKidney(users[0].kidneys)) {
        res.sendStatus(411)
    }
    for(let i = 0;i < users[0].kidneys.length;i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({
        status: "SUCCESS"
    })
})

app.delete("/", (req, res) => {
    const healthy = users[0].kidneys.filter(el => el.healthy);
    if(isThereAnyUnhealthyKidney(users[0].kidneys)) {
        res.sendStatus(411);
    }
    users[0].kidneys = healthy
    res.json({
        status: "SUCCESS"
    })
})
function isThereAnyUnhealthyKidney(arr) {
    return arr.filter(el => !el.healthy).length != 0;
}

// app.post("/conversations/:id", (req, res) => {
//     console.log(req.headers);
//     console.log(req.params)
//     res.send({
//         msg: "2 + 2 is 4"
//     })
// })

app.listen(port, () => {
    console.log(`listening on ${port}`)
})