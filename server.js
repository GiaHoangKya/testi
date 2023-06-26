
const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://hoangthggcs210135:123456789abc@cluster0.roi7nvg.mongodb.net/'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        
        
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        
        
        app.set('view engine', 'ejs') 
        
        
        app.use(bodyParser.urlencoded({ extended: true }))

       
        app.use(express.static('public'))

        
        app.use(bodyParser.json())

      
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {

                    // results -> server -> console
                    console.log(results)
                    
                    // results -> index.ejs -> client -> browser 
                    // The file 'index.ejs' must be placed inside a 'views' folder BY DEFAULT
                    res.render('index.ejs', { quotes: results })
                })
                .catch(/* ... */)
        })

        // (1b) CREATE: client -> index.ejs -> data -> SUBMIT 
        // -> post -> '/quotes' -> collection -> insert -> result
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                
                // results -> server -> console
                console.log(result)

                // -> redirect -> '/'
                res.redirect('/')
                
             })
             
            .catch(error => console.error(error))
            
        })
        
        // (3) UPDATE: client -> click -> 'Replace Yoda's quote'
        // -> replace / create -> 'Yoda' -> 'Darth Vadar'
        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                    // If name 'Yoda' exists, change Yoda’s quotes into Darth Vadar’s quotes
                    $set: {
                        STT: req.body.STT,
                        name: req.body.name,
                        price: req.body.price,
                        image: req.body.image
                    }
                },
                {
                    // If no Yoda quotes exist, force to create a new Darth Vadar quote
                    upsert: true
                }
            )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))
        })

        // (4) DELETE: client -> click -> 'Delete Darth Vadar's quote'
        // -> delete -> 'Darth Vadar' 
        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                {name: req.body.name}
            )
            .then(result => {
                res.json(`Deleted Darth Vadar's quote`)
            })
            .catch(error => console.error(error))
        })

        // server -> listen -> port -> 3000
        app.listen(4000, function() {
            console.log('listening on 4000')
        })
    })



/*
app.get('/', (req, res) => {
    res.send('Hello World')
})
*/

/*
app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooooooooo!')
})
*/

/*
app.post('/quotes', (req, res) => {
    console.log(req.body)
})
*/


