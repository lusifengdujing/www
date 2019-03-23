let XLSX=require('xlsx');
let fs=require('fs');
let path = require('path');

function handleExcel(filename){
	// 读取Excel
	let workbook=XLSX.readFile("./upload/"+filename,{});	
	let Index=workbook.Sheets['Index'];
	let Var=workbook.Sheets['Var'];
	

	// console.log(XLSX.utils.sheet_to_json(Var));	
	let jsonIndex=XLSX.utils.sheet_to_json(Index);
	console.log(jsonIndex);
	
	
	let jsonVar=XLSX.utils.sheet_to_json(Var);
	let XMLWriter = require('xml-writer');
	//drive文件生成
    let	driveFile = new XMLWriter(true);
	
    driveFile.startDocument('1.0', 'UTF-8');	
	
	driveFile.startElement('root');
	driveFile.startElement('points');
	for(let i=0,length=jsonVar.length;i<length;i++){
		// 编写节点
		driveFile.startElement('Item')
		.writeAttribute('Name', jsonVar[i]["名称"])
		.writeAttribute('Address', jsonVar[i]["起始地址"])
		.endElement();  		
	}	
	driveFile.endDocument(); 
	console.log(driveFile.toString());
	
	for(let i=0,length=jsonIndex.length;i<length;i++){
		let file = path.join('/Project/Driver/OPC', jsonIndex[i]["包含设备号"]+'.device'); 
		fs.writeFile(file,driveFile.toString(),(err)=> {
		if (err) {
		return console.log(err);
		}
		console.log('文件创建成功，地址：' + file);
		});
	}
	
	
}


module.exports=handleExcel;