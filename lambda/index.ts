import { S3 } from '@aws-sdk/client-s3';

console.log('Loading function');
const s3 = new S3();


export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.queryStringParameters.bucket;
    const key = decodeURIComponent(event.queryStringParameters.objectKey.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };
    try {
        const { ContentType } = await s3.getObject(params);
        console.log('CONTENT TYPE:', ContentType);
        return {
            ContentType,
            Version: "2.0"
        };
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
