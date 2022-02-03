const path = require("path");
const { v4: uuidv4 } = require("uuid");

const validExtensions = ["jpg", "png", "jpeg", "gif", "JPG", "PNG", "JPEG"];

const uploadFile = (files) => {
  return new Promise((resolve, reject) => {
    const { img } = files;
    const splitName = img.name.split(".");
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      throw new Error(
        `Invalid extension, allowed extension are: [${validExtensions}]`
      );
    }

    const fileTemp = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, "../storage/imgs/", fileTemp);
    img.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
    });
    resolve(fileTemp);
  });
};

const uploadFilesProducts = (files) => {
  return new Promise((resolve, reject) => {
    const { img } = files;

    if (img.length >= 2) {
      let nameImages = [];

      for (let i = 0; i < img.length; i++) {
        const splitName = img[i].name.split(".");
        const extension = splitName[splitName.length - 1];

        if (!validExtensions.includes(extension)) {
          throw new Error(
            `Invalid extension, allowed extension are: [${validExtensions}]`
          );
        }

        const fileTemp = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, "../storage/imgs/", fileTemp);
        img[i].mv(uploadPath, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });

        nameImages.push(fileTemp);
      }
      resolve(nameImages);
    } else {
      const splitName = img.name.split(".");
      const extension = splitName[splitName.length - 1];

      if (!validExtensions.includes(extension)) {
        throw new Error(
          `Invalid extension, allowed extension are: [${validExtensions}]`
        );
      }

      const fileTemp = `${uuidv4()}.${extension}`;
      const uploadPath = path.join(__dirname, "../storage/imgs/", fileTemp);
      img.mv(uploadPath, (err) => {
        if (err) {
          reject(err);
          return;
        }
      });
      resolve(fileTemp);
    }
  });
};

module.exports = {
  uploadFile,
  uploadFilesProducts,
};
