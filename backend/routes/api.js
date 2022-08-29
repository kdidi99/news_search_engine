//
//
//  IMPORT MODULES
//

const express = require('express');

//importing 'Article' model for Mongoose    //  is used for API calls to database
const Article = require('../models/article');
//importing 'Topic' model for Mongoose    //  is used for API calls to database
const Topic = require('../models/topic');

//setting up router object
const apiRouter = express.Router();

//
//
//  API ROUTES
//

//  Parameters

//catching parameter ':topicID'
apiRouter.param('topicID', (req, res, next) => {
    //currently only logs parameter
    console.log(req.params.topicID);
    next();
})

//catching parameter ':articleID'
apiRouter.param('articleID', (req, res, next) => {
    //currently only logs parameter
    console.log(req.params.articleID);
    next();
})

//  TOPICS

apiRouter.route("/topics")
    
        //returns all topics as JSON
    .get((req, res, next)=>{
        
        //finds all topics 
        Topic.find({})
        //returns found topics as JSON
        .then(data=> res.json(data));
})
        //creates new topic and returns it as a JSON
    .post((req, res, next)=>{

        //create new topic based on input
        const newTopic = new Topic(req.body);
        //save new topic to database
        newTopic.save()
        //and return new topic as a JSON to confirm
        .then(data=> res.json(data));
    })


apiRouter.route("/topics/:topicID")

        //returns topic where _id = ':topicID' as JSON
    .get((req, res, next)=>{
        
        //saving parameter as constant for ease of use
         const { topicID } = req.params;

        //finds topic where _id = ':topicID'
        Topic.findById(topicID)
        //returns found topics as JSON
        .then(data=> res.json(data));
})
        //updates topic where _id = ':topicID' and returns updated topic as JSON
    .patch((req, res, next)=>{

        //saving parameter as constant for ease of use
        const { topicID } = req.params;

        //saving options as constant for ease of use
        const options = {
            runValidators: true,    //update has to be validated
            returnDocument: 'after' //returns document after being updated
        }

        //finds topic where _id = ':topicID'
        //updates according to JSON input
        Topic.findByIdAndUpdate(topicID, req.body, options)
        //returns updated topic as JSON
        .then(data=> res.json(data));
})      
        //deletes topic where _id = ':topicID'
    .delete((req, res, next)=>{

        //saving parameter as constant for ease of use
        const { topicID } = req.params;
        
        //finds topic where _id = ':topicID'
        //deletes topic
        Topic.findByIdAndDelete(topicID)
        //returns deleted topic as JSON
        .then(data=> res.json(data))
})

apiRouter.route("/topics/:topicID/articles")

        //returns all articles under topic matching ':topicID' as JSON
    .get((req, res, next)=>{
        
        //saving parameter as constant for ease of use
        const { topicID } = req.params;

        //finds articles matching 'topicID' with value under 'topic' key 
        Article.find({topic:topicID})
        //returns found articles as JSON
        .then(data=> res.json(data));
})
        //creates new article and returns it as a JSON
        //tends to work way better if input is a single JSON object and not an array
            //this is a very special path, as it has an unused parameter in :topicID
            //strongly consider forcing this into newArticle document
    .post((req, res, next)=>{

        //create new article based on input
        const newArticle = new Article(req.body);
        //save new article to database
        newArticle.save()
        //and return new article as a JSON to confirm
        .then(data=> res.json(data));
})
        

//  ARTICLES

apiRouter.route("/articles")

        //returns all articles as JSON
    .get((req, res, next)=>{
        
        //finds all articles 
        Article.find({})
        //returns found articles as JSON
        .then(data=> res.json(data));
})
        //creates new article and returns it as a JSON
            //tends to work way better if input is a single JSON object and not an array
    .post((req, res, next)=>{

        //create new article based on input

        const newArticle = new Article(req.body);
        //save new article to database
        newArticle.save()
        //and return new article as a JSON to confirm
        .then(data=> res.json(data));
    })

apiRouter.route("/articles/:articleID")
        
        //returns article with _id = ':articleID' as JSON
    .get((req, res, next)=>{
        
        //saving parameter as constant for ease of use
        const { articleID } = req.params;

        //finds articles with _id = 'articleID'
        Article.findById(articleID)
        //returns found article as JSON
        .then(data=> res.json(data));
})
        //updates article where _id = ':articleID' and returns updated article as JSON
    .patch((req, res, next)=>{

        //saving parameter as constant for ease of use
        const { articleID } = req.params;

        //saving options as constant for ease of use
        const options = {
            runValidators: true,    //update has to be validated
            returnDocument: 'after' //returns document after being updated
        }

        //findsarticle where _id = ':articleID'
        //updates according to JSON input
        Article.findByIdAndUpdate(articleID, req.body, options)
        //returns updated article as JSON
        .then(data=> res.json(data));
})      
        //deletes article where _id = ':articleID'
    .delete((req, res, next)=>{

        //saving parameter as constant for ease of use
        const { articleID } = req.params;

        //finds article where _id = ':articleID'
        //deletes article
        Article.findByIdAndDelete(articleID)
        //returns deleted article as JSON
        .then(data=> res.json(data))
})

apiRouter.route("/articles/:articleID/topics")
    /*  this is unused because Topic.find *will* break.
        Find an elegant way to find :articleID in the articles array of all topics
        Or make it that articles have the _ids of their topics

        //returns all topics under article matching ':articleID' as JSON
    .get((req, res, next)=>{
        
        //saving parameter as constant for ease of use
        const { articleID } = req.params;

        //finds topics matching 'articleID' with value under 'article' key 
        Topic.find({articles:articleID})
        //returns found topics as JSON
        .then(data=> res.json(data));
})  */
        //creates new topic and returns it as a JSON
        //tends to work way better if input is a single JSON object and not an array
            //this is a very special path, as it has an unused parameter in :articleID
            //strongly consider forcing this into newTopic document
    .post((req, res, next)=>{

        //create new topic based on input
        const newTopic = new Topic(req.body);
        //save new topic to database
        newTopic.save()
        //and return new topic as a JSON to confirm
        .then(data=> res.json(data));
})

//
//
//  FINAL
//

//export module to be imported in backend/app.js
module.exports=apiRouter;