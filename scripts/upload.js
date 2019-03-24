//打印上传excel文件信息
let upload=(req,res,next)=>{
	res.json({        
		originalname: req.file.originalname,
		path:req.file.path
	});	

	next();	
}

module.exports=upload;