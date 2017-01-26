var express = require('express');
var fs = require('fs');
var router = express.Router();
var YandexDisk = require("yandex-disk").YandexDisk;
var Portfolio = require("../models/portfolio");
/* GET home page. */

var disk = new YandexDisk("lorkris", "disk5pass");


router.get('/disk', function(req, res){
    disk.readFile("Хлебные крошки.mp4", "base64", function(err, data){
        console.log("data");
        // res.send("<img src=data:video/mp4;base64,"+ data +"></img>")
    });
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', admin:req.session.admin});
});

router.get('/portfolio', function(req, res, next){
    var slide = 1*req.query.slide;
    if(slide){
        Portfolio.findBySlide(slide, function(err, portfolios){
            if(err){
                throw err;
            }else{
                res.json({
                    portfolios:portfolios
                });
            }
        });
    }else{
        next(new Error())
    }
});

router.post('/add', function(req, res, next){
    if(req.body.file.length>0){
        var file = JSON.parse(req.body.file);
        var imageReg = /^image\//;
        if(imageReg.test(file.type)){
            portfolio = new Portfolio({
                name: req.body.name,
                note: req.body.note,
                slideNumber:req.body.slideNumber,
                fileContent: file.content
            });
            portfolio.save(function(err, portfolio){
                if(err){
                    throw err;
                }else{
                    res.json({
                        status:200,
                        result:portfolio
                    });
                }
            });
        }
    }else{

    }
});

router.get('/get/:id_category', function(req, res, next){

});

module.exports = router;
