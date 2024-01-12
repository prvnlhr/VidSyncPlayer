const express = require("express");
const multer = require("multer");
const AWS = require('aws-sdk');
require('dotenv').config();

const VideoDB = require('../models/videoModel');

// Initialize AWS S3 with credentials from environment variables
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Function to upload a file to AWS S3
const uploadFileToS3 = async (file, key, contentType) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: contentType,
        };

        // Upload the file to S3
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


    // Upload the video and subtile to aws and then store info to MongoDB all ---------------------------------------------------
    uploadVideo: async (req, res) => {
        try {
            const videoTitle = req.body.videoTitle;
            const videoFile = req.files.videoFile[0];
            const subtitleFile = req.files.subtitleFile[0];

            // Upload video file to AWS S3
            const videoData = await uploadFileToS3(videoFile, `videos/${videoTitle}.mp4`, 'video/mp4');

            // Upload subtitle file to AWS S3
            const subtitleData = await uploadFileToS3(subtitleFile, `subtitles/${videoTitle}.vtt`, 'text/vtt');

            // Save video details in MongoDB
            const videoDetails = await VideoDB.create({
                videoTitle: videoTitle,
                videoUrl: videoData.Location,
                subtitleUrl: subtitleData.Location,
            });

            res.status(200).json(videoDetails);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get all videos from MongoDB----------------------------------------------------
    getAllVideos: async (req, res) => {
        try {
            const allVideos = await VideoDB.find({});
            res.status(200).json(allVideos);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = videoController;
