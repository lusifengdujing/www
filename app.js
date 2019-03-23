// 使用express框架
let express=require('express');
let app=express();

// 如果使用POST，需要引入中间件来解析URL编码体。
// Multer作为express的一个中间件实现文件上传
let bodyParser=require('body-parser');
let multer=require('multer');

let multerUtil=require('./scripts/multerUtil.js')
let handleForm=require('./scripts/handleForm.js');
let upload=require('./scripts/upload.js');


app.use(bodyParser.urlencoded({extended: false}));
// 定义单文件上传接收file
app.use(multerUtil.single('file'));



// 处理表格数据
app.post('/node/readin',handleForm);
//单个文件上传
app.post('/node/upload',upload);



app.listen(3000,()=>{
	console.log('node服务端开启');
});
        
        

