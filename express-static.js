const express = require('express')
const app = express()
const router = express.Router();

app.use('/', express.static(__dirname + "/static"))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

router.route("/")
    .all((req, res, next) => {
        console.log(`Request from : ${req.originalUrl}`)
        console.log(`Request type : ${req.method}`)
        console.log(`Request params : ${req.params}`)
        next();
    })
    .get((req, res) => {
        console.log(req.params)
        res.send(JSON.stringify([]))
        res.status(200)
        res.end()
    })
    .post((req, res) => {
        console.log(req.body)
        res.status(201)
        res.end()
    })

router
    .param('id', (req, res, next, id) => {
        console.log(`Request from : ${req.params}`)
        console.log(`Request type : ${req.method}`)
        console.log(`Request id : ${id}`)
        next()
    })
    .route("/:id")
    .get((req, res) => {
        console.log(req.params)
        res.send(JSON.stringify({}))
        res.status(200)
        res.end()
    })
    .put((req, res) => {
        console.log(req.body)
        res.status(203)
        res.end()
    })
    .delete((req, res) => {
        res.status(203)
        res.end()
    })

app.use('/posts', router)

app.listen(4000, () => {
    console.log('Server listen on http://localhost:4000')
})