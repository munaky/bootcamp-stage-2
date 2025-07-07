import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'src/uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1000000 //2mb
    },
    fileFilter: function (req, file, callback) {
        const allowedExtension = ['.png', '.jpg', '.jpeg'];
        const extension = path.extname(file.originalname);

        if(!allowedExtension.includes(extension)) {
            return callback(new Error('only [png, jpeg, jpg] are allowed'))
        }

        callback(null, true)
    },
})