import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fileTypeFromBuffer } from "file-type";


export class UploadFileService{
    firebaseBucketPath = process.env.FIREBASE_BUCKET;
    constructor(private path: string = ""){

    }

    async upload(base64: string): Promise<string>{
       const fileBuffer = Buffer.from(base64, "base64");
       const fileType = await fileTypeFromBuffer(fileBuffer);

       const fileName = `image_${Date.now()}.${fileType?.ext}`;
       fs.writeFileSync(fileName, fileBuffer);
        
       const bucket = getStorage().bucket(this.firebaseBucketPath);
       const uploadResponse = await bucket.upload(fileName, {
        destination: this.path+fileName,
       });

       return getDownloadURL(uploadResponse[0]);

    }
}