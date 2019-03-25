let XMLWriter = require('xml-writer');
let path = require('path');
let writeFile = require('./writeFile.js');
let fs = require('fs');


// 生成Driver文件
let writeDriver = function (sheetIndex, sheetVar, devices) {
    // 用来存放生成的文件    
    let files = [];

    for (let i = 0, length = devices.length; i < length; i++) {
        let driveFile = new XMLWriter(true);
        driveFile.startDocument('1.0', 'UTF-8')
            .startElement('root')
            .writeAttribute('Name', devices[i])
            .writeAttribute('RemoteAddress', sheetIndex[i]["PLC IP地址"])
            .writeAttribute('RemotePort', sheetIndex[i]["PLC 通讯端口号"])
            .startElement('points');
        for (let j = 0, length = sheetVar.length; j < length; j++) {
            // 判断是否读取的空格数据
            if(sheetVar[j]["名称"]===" ") break;
            driveFile.startElement('Item')
                .writeAttribute('Name', devices[i] + '/' + sheetVar[j]["名称"])
                .writeAttribute('Desc', sheetVar[j]["描述"])
                .writeAttribute('Address', sheetVar[j]["起始地址"].replace(/[%]/, ""))
                .endElement();
        }
        files[i] = driveFile.toString();
        // console.log(files[i]);

        // 写入文件
        let file = path.join('/Project/Driver/OPC', devices[i] + '.device');
        fs.writeFile(file, driveFile.toString(), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('文件创建成功，地址：' + file);
        });
    }
}

// 生成Rtdb文件
let writeRtdb = function (sheetIndex, sheetVar, devices) {
    let files = [];

    for (let i = 0, length = devices.length; i < length; i++) {
        let rtdbFile = new XMLWriter(true);
        rtdbFile.startDocument('1.0', 'UTF-8')
            .startElement('Item');            
        for (let j = 0, length = sheetVar.length; j < length; j++) {
            // 判断是否读取的空格数据
            if(sheetVar[j]["名称"]===" ") break;
            rtdbFile.startElement('Item')
                .writeAttribute('Name', sheetVar[j]["名称"])
                .writeAttribute('Desc', sheetVar[j]["描述"])
            if(sheetVar[j]["数据类型"]==="Boolean"){
                rtdbFile.writeAttribute('Type','Boolean');
            }                
            rtdbFile.endElement();
        }
        files[i] = rtdbFile.toString();
        console.log(files[i]);

        // 写入文件,在RealTimeDatabase文件下生成相应的文件并保存Variables.var文件
        // let file = path.join('/Project/Driver/OPC', devices[i] + '.device');
        // fs.writeFile(file, driveFile.toString(), (err) => {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log('文件创建成功，地址：' + file);
        // });
    }

}


module.exports = {
    writeDriver: writeDriver,
    writeRtdb:writeRtdb
}