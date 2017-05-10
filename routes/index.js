const express = require('express');
const fs = require('fs');
const router = express.Router();
const Portfolio = require("../models/portfolio");
const cloudinary = require("../lib/cloudinary");
const path = require('path');
const multer = require('multer');
const async = require('async');

const upload = multer({
    dest: '../uploads/',
    limits: {
        "fieldSize" : 50*1024*1024
    }
});
/* GET home page. */


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', admin:req.session.admin});
});

router.get('/portfolio', function(req, res, next){
    const slide = 1*req.query.slide;
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

router.post('/add', upload.any(), function(req, res, next){
    // console.log("req.files",req.files);
    // console.log("req.body", req.body);

    const portfolio = {
        name: req.body.name,
        note: req.body.note,
        slideNumber: req.body.slideNumber,
        portfolioType: req.body.portfolioType
    };

    const videoReg = /^video\//;
    const imageReg = /^image\//;
    console.log("req.files", req.files);
    if(req.files.length > 0){
        async.map(req.files, function(file, callback){
            if(imageReg.test(file.mimetype)) {
                cloudinary.uploader.upload(file.path, (image) => {
                    callback(null, image);
                });
            }else if(videoReg.test(file.mimetype)){
                cloudinary.uploader.upload(file.path, (video) =>{
                    callback(null, video);
                }, { resource_type: "video" });
            }
        }, (err, files) => {
            if(!err){
                if(req.body.portfolioType === "fileVideo"){
                    files.forEach((file)=>{
                        if(file.resource_type === "image"){
                            portfolio.coverLink = file.url;
                            portfolio.cover_original_filename = file.original_filename;
                        }else if(file.resource_type === "video"){
                            portfolio.fileLink = file.url;
                            portfolio.original_filename = file.original_filename;
                        }
                    });
                }else if(req.body.portfolioType === "filePhoto"){
                    var file = files[0];
                    if(file.resource_type === "image"){
                        portfolio.fileLink = file.url;
                        portfolio.original_filename = file.original_filename;
                    }
                }else if(req.body.portfolioType === "linkVideo"){
                    var file = files[0];
                    portfolio.fileLink = req.body.linkFile;
                    if(file.resource_type === "image"){
                        portfolio.coverLink = file.url;
                        portfolio.cover_original_filename = file.original_filename;
                    }
                }

                dbPorfolio = new Portfolio(portfolio);

                dbPorfolio.save((err, newPortfolio)=>{
                    if(!err){
                        console.log("newPortfolio",newPortfolio);
                        res.json({
                            status:200,
                            portfolio: newPortfolio
                        })
                    }else{
                        res.send({
                            status:400,
                            message: "Ошибка при сохранении портфолио"
                        });
                    }
                });

            }else{
                console.log("async err");
                res.send({
                    status:400,
                    message: "Ошибка при добавлении файлов"
                });
            }
        });
    }else{
        if(req.body.portfolioType === "linkPhoto" ){
            console.log("req.body link", req.body);
            portfolio.fileLink = req.body.linkFile;
            dbPorfolio = new Portfolio(portfolio);

            dbPorfolio.save((err, newPortfolio)=>{
                if(!err){
                    console.log("newPortfolio",newPortfolio);
                    res.json({
                        status:200,
                        portfolio: newPortfolio
                    })
                }else{
                    res.send({
                        status:400,
                        message: "Ошибка при сохранении портфолио"
                    });
                }
            });
        }
    }



});

router.get('/get/:id_category', function(req, res, next){

});

module.exports = router;
