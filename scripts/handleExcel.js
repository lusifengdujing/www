//解析上传的excel文件并生成相应的文件
let XLSX=require('xlsx');
let fs=require('fs');
let path = require('path');
let writeFile=require('./writeFile.js');


function handleExcel(req,res,next){
	// 读取上传的Excel
	let fileName=req.file.originalname;
	let workbook=XLSX.readFile("./upload/"+fileName,{});	
	
	// 将excel的工作笔Index和Var的内容加入到excelWorkbook对象中
	let excelWorkbook={
		sheetIndex:XLSX.utils.sheet_to_json(workbook.Sheets['Index']),
		sheetVar:XLSX.utils.sheet_to_json(workbook.Sheets['Var'])
	}



	//生成Driver文件
	writeFile.writeDriver(excelWorkbook);


	
	let XMLWriter = require('xml-writer');
	//Drive文件生成

	let	driveFile = new XMLWriter(true);
	
	
    driveFile.startDocument('1.0', 'UTF-8');	
	
	driveFile.startElement('root');
	driveFile.startElement('points');
	// for(let i=0,length=jsonVar.length;i<length;i++){
	// 	// 编写节点
	// 	driveFile.startElement('Item')
	// 	.writeAttribute('Name', jsonVar[i]["名称"])
	// 	.writeAttribute('Address', jsonVar[i]["起始地址"])
	// 	.endElement();  		
	// }	
	driveFile.endDocument(); 
	console.log(driveFile.toString());
	
	// for(let i=0,length=jsonIndex.length;i<length;i++){
	// 	let file = path.join('/Project/Driver/OPC', jsonIndex[i]["包含设备号"]+'.device'); 
	// 	fs.writeFile(file,driveFile.toString(),(err)=> {
	// 	if (err) {
	// 	return console.log(err);
	// 	}
	// 	console.log('文件创建成功，地址：' + file);
	// 	});
	// }
	
	
}


module.exports=handleExcel;