const express = require("express");
const multer = require("multer");
const AWS = require('aws-sdk');
require('dotenv').config();

const VideoDB = require('../models/videoModel');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


const uploadFileToS3 = async (file, key, contentType) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: contentType,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('S3 Upload Error:', err);
                reject(err);
            } else {
                console.log('S3 Upload Successful:', data);
                resolve(data);
            }
        });
    });
};




const videoController = {
    uploadVideo: async (req, res) => {
        try {
            const videoTitle = req.body.videoTitle;
            const videoFile = req.files.videoFile[0];
            const subtitleFile = req.files.subtitleFile[0];

            // Upload video file
            const videoData = await uploadFileToS3(videoFile, `videos/${videoTitle}.mp4`, 'video/mp4');


            // Upload subtitle file
            const subtitleData = await uploadFileToS3(subtitleFile, `subtitles/${videoTitle}.vtt`, 'text/vtt');

            console.log('Video Upload Result:', videoData);
            console.log('Subtitle Upload Result:', subtitleData);

            const videoDetails = await VideoDB.create({
                videoTitle: videoTitle,
                videoUrl: videoData.Location,
                subtitleUrl: subtitleData.Location,
            });

            console.log('MongoDB Response:', videoDetails);


            res.status(200).json({ success: 'Success uploading' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllVideos: async (req, res) => {
        try {
            const allVideos = await VideoDB.find({});
            console.log(allVideos);
            res.status(200).json(allVideos);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = videoController;
