//作者:lsf
//程序的启动模块
//添加第三方插件到express实例app中和引入自定义模块
let express=require('express');
let app=express();

// 引入自定义模块
let multerUtil=require('./scripts/multerUtil.js')
let handleForm=require('./scripts/handleForm.js');
let upload=require('./scripts/upload.js');
let handleExcel=require('./scripts/handleExcel.js');




//引入body-parser,解析post请求
let bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// 定义单文件上传接收file
app.use(multerUtil.single('file'));


// 简单路由

// 处理表格数据
app.post('/node/readin',handleForm);
//单个文件上传
app.post('/node/upload',[upload,handleExcel]);



app.listen(3000,()=>{
	console.log('node服务端3000开启');
});
        
        

