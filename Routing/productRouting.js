const express=require('express');
const router = express.Router();
const {addPickleProduct,allPickles,deletePickleProduct,updatePickleProduct}=require('../Controllers/ProductControllers');
const {isAdmin}=require('../Middlewares/authMiddleware');

const multer=require('multer');  
const storage = multer.memoryStorage()
const path = require("path");




// this is for the local storage for the disk storage

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/data/uploads");
//     },

//     filename: (req, file, cb) => {
//         const uniqueName =
//             Date.now() + path.extname(file.originalname);

//         cb(null, uniqueName);
//     }
// });
// const upload = multer({ storage });

const upload = multer({ storage: storage })

router.post('/addPickle',isAdmin,upload.array('pickleImage') ,addPickleProduct);
router.get('/allPickles',isAdmin,allPickles);
router.delete('/deletePickle/:id',isAdmin,deletePickleProduct);
router.put('/updatepickle/:id',isAdmin, upload.array("pickleImage"),updatePickleProduct);

module.exports=router;    
// mm