// 文件上传属性配置
let multer = require('multer');

let storage = multer.diskStorage({
	//设置上传后文件路径
	destination: (req, file, cb) => {
		cb(null, './upload');
	},
	//给上传文件重命名,获取添加后缀名
	filename: (req, file, cb) => {
		// file.originalname上传文件的原始文件名            
		cb(null, file.originalname);
	}
});


//添加配置文件到multer对象
let multerUtil = multer({
	storage: storage
});

module.exports = multerUtil;