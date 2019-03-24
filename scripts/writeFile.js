let XMLWriter = require('xml-writer');
let path = require('path');
let writeFile=require('./writeFile.js');
let fs=require('fs');

let writeDriver = function (excelWorkbook) {
    // 用来存放生成的文件
    // 用来存放设备号
    let files = [];
    let devices = [];

    let sheetIndex = excelWorkbook["sheetIndex"];
    let sheetVar = excelWorkbook["sheetVar"];


    // 获取设备号
    for (let i = 0, length = sheetIndex.length; i < length; i++) {
        devices[i] = sheetIndex[i]["包含设备号"];
    }
    console.log(devices);


    for (let i = 0, length = devices.length; i < length; i++) {
        let driveFile = new XMLWriter(true);
        driveFile.startDocument('1.0', 'UTF-8').startElement('root').startElement('points');
        for (let j = 0, length = sheetVar.length; j < length; j++) {
            driveFile.startElement('Item')
                .writeAttribute(devices[i] + '/Name', sheetVar[j]["名称"]);
                let a=sheetVar[j]["起始地址"];                
                driveFile.writeAttribute('Address', sheetVar[j]["起始地址"].replace(/[%]/g,""))
                    .endElement();
            
        }
        files[i]=driveFile.toString();
        console.log(files[i]);

        // 写入文件
		let file = path.join('/Project/Driver/OPC',devices[i]+'.device'); 
		fs.writeFile(file,driveFile.toString(),(err)=> {
		if (err) {
		return console.log(err);
		}
		console.log('文件创建成功，地址：' + file);
		});
	}
    }






module.exports = {
    writeDriver: writeDriver
}