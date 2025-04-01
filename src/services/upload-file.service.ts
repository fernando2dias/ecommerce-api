import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fileTypeFromBuffer } from "file-type";
import { randomUUID } from "node:crypto";
import { ValidationError } from "../errors/validation.error.js";


export class UploadFileService{
    firebaseBucketPath = process.env.FIREBASE_BUCKET;
    constructor(private path: string = ""){

    }

    async upload(base64: string): Promise<string>{
       const fileBuffer = Buffer.from(base64, "base64");
       const fileType = await fileTypeFromBuffer(fileBuffer);

       if(!fileType){
        throw new ValidationError("This extension file is invalid!");
       }

       if(fileType.mime !=="image/jpeg" && fileType.mime !== "image/png"){
        throw new ValidationError("The extension file should be jpg or png!");
       }

       const fileName = `image-${randomUUID().toString()}.${fileType?.ext}`;
       fs.writeFileSync(fileName, fileBuffer);
        
       const bucket = getStorage().bucket(this.firebaseBucketPath);
       const uploadResponse = await bucket.upload(fileName, {
        destination: this.path+fileName,
       });

       fs.unlinkSync(fileName);

       return getDownloadURL(uploadResponse[0]);

    }
}