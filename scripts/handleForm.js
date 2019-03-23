//处理表单数据并生成json文件保存在/Project下
let fs = require("fs");
let path = require('path');

let handleForm=function(req,res){	
	let jsondata=req.body;	
	// 获取设备名
	console.log(jsondata);
	let device=jsondata["device"];	
	//指定创建目录及文件名称，在/Project文件中创建设备名.json文件			
	let file = path.join('/Project', device+'.json'); 
	let file1 = path.join('/Project', device+'.device'); 
	// 删除表单中的设备数据
	delete jsondata["device"];
		
	// 将json对象解析成字符串
	let content = JSON.stringify(jsondata);
	console.log(content);
	delete content["device"];
	
	//将json转成xml格式
	
	let XMLWriter = require('xml-writer');
	// 参数选择true会自动排版；false不会自动排版
	//drive文件生成
    let	driveFile = new XMLWriter(true);
	
    driveFile.startDocument('1.0', 'UTF-8');	
	
	driveFile.startElement('root');
	driveFile.startElement('points');
	
	for(let i=0;i<jsondata["var"].length&&jsondata["var"][i]!="";i++){
		// 编写节点
		driveFile.startElement('Item')
		.writeAttribute('Name', jsondata["var"][i])
		.writeAttribute('Address', jsondata["address"][i])
		.endElement();  		
	}	
	driveFile.endDocument();
	
	
 
    console.log(driveFile.toString());
	//写入json文件
	fs.writeFile(file1,driveFile.toString(),(err)=> {
	if (err) {
		return console.log(err);
		}
	console.log('文件创建成功，地址：' + file1);
	});
	
	
	//写入device文件
	fs.writeFile(file,content,(err)=> {
	if (err) {
		return console.log(err);
		}
	console.log('文件创建成功，地址：' + file);
	});
	res.end('file address:' +'\n'+ file+'\n'+file1);
}

module.exports = handleForm;

