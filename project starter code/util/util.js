import fs from "fs";
import Jimp from "jimp";
import axios from"axios";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      const imageBuffer = await axios.get(inputURL,{responseType: "arraybuffer"});
      const photo = await Jimp.read(Buffer.from(imageBuffer?.data,"binary"));
      const currentFolder = process.cwd();
      const outpath =
      currentFolder +"/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath, (img) => {
          resolve(outpath);
        });
  } catch (error) {
    reject(error);
  }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  if(files.lenght > 1){
    for (let file of files) {
      fs.unlinkSync(file);
    }
  }else{
    fs.unlinkSync(files);
  }
}