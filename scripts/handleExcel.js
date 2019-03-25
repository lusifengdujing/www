//解析上传的excel文件并生成相应的文件
let XLSX=require('xlsx');
// let fs=require('fs');
// let path = require('path');
let writeFile=require('./writeFile.js');


function handleExcel(req,res,next){
	// 读取上传的Excel
	let fileName=req.file.originalname;
	let workbook=XLSX.readFile("./upload/"+fileName,{});	
	
	//sheetIndex:Index工作表
	//sheetVar:Var工作表
	//devices:Index表中的设备数组
	let sheetIndex = XLSX.utils.sheet_to_json(workbook.Sheets['Index']);
    let sheetVar = XLSX.utils.sheet_to_json(workbook.Sheets['Var']);
	let devices=[];
	// 获取设备号
    for (let i = 0, length = sheetIndex.length; i < length; i++) {
        devices[i] = sheetIndex[i]["包含设备号"];
	}	

	//生成Driver文件	
	writeFile.writeDriver(sheetIndex,sheetVar,devices);
	//生成Rtdb文件
	writeFile.writeRtdb(sheetIndex,sheetVar,devices);
}


module.exports=handleExcel;