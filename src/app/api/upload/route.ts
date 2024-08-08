import {
    S3Client,
    ListObjectsCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from 'crypto'

import { NextRequest, NextResponse } from "next/server";
const Bucket = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ID as string,
    },
});
const getFileExtension = (filename: string): string => {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) return "";
    return filename.substring(lastDotIndex);
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("file") as File[];
        if(files.length > 1) {
            return NextResponse.json({ message: "Only one file is allowed" }, { status: 400 });
        }

        if (files[0].type == "image/jpeg" || files[0].type == "image/png" || files[0].type == "image/webp" || files[0].type == "image/jpg") {
            var FileId = randomUUID()
            let url = ""
            const response = await Promise.all(
                files.map(async (file) => {
                    console.log(FileId)
                    const Body = (await file.arrayBuffer()) as Buffer;
                    url = `https://${Bucket}.s3.${AWS_REGION}.amazonaws.com/${FileId}${getFileExtension(file.name)}`
                    s3.send(new PutObjectCommand({ Bucket, Key: `${FileId}${getFileExtension(file.name)}`, Body , ContentType:files[0].type}))
                })
            );
        
            return NextResponse.json({ message: "File uploaded successfully", URL: url }, { status: 200 });
        } else if (files[0].type == "application/pdf") {
            let FileId = randomUUID()
            let url = ""
            const response = await Promise.all(
                files.map(async (file) => {
                    const Body = (await file.arrayBuffer()) as Buffer;
                    url = `https://${Bucket}.s3.amazonaws.com/Contracts/${FileId}${getFileExtension(file.name)}`
                    s3.send(new PutObjectCommand({ Bucket, Key: `Contracts/${FileId}${getFileExtension(file.name)}`, Body , ContentType:files[0].type})).then((res) => {
                        console.log(res)
                    });
                })
            );
            return NextResponse.json({ message: "File uploaded successfully", URL: url }, { status: 200 });
        }
        return NextResponse.json({ message: "File need to be image or pdf" }, { status: 400 });

    } catch (error) {
        console.log(error)
        return NextResponse.json(error);

    }
}