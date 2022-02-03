const path = require('path')
const fs = require('fs')
const {promisify} = require('util')


const deleteImg=async(nameImage)=>{
    promisify(fs.unlink)(path.resolve(__dirname,"../storage/imgs", nameImage));
};


module.exports = {deleteImg}