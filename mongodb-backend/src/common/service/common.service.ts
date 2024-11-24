import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { StudentsRepository } from 'src/students/repository/students.repository';

@Injectable()
export class CommonService {
    constructor(
        private readonly studentRepository: StudentsRepository,
        
    ) { }

    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    async uploadFile(file: Express.Multer.File, fileName: string) {
        return await this.s3_upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            fileName,
            file.mimetype,
        );
    }

    async s3_upload(file: any, bucket: string, name: any, mimetype: any) {
        const params = {
            Bucket: bucket,
            Key: `User1/${String(name)}`,
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: process.env.AWS_REGION,
            },
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }

   
   


}