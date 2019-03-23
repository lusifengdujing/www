// let xlsx2json = require("node-xlsx");
//使用ejsexcel读取excel文件  npm install ejsexcel --save
let XLSX=require('xlsx');
let fs=require('fs');
let path = require('path');
let handleExcel=require('./handleExcel.js')


let upload=(req,res)=>{
	res.json({        
        originalname: req.file.originalname
	});
	let filename=req.file.originalname;
	
	// 处理Excel
	handleExcel(filename);	
	
}

module.exports=upload;