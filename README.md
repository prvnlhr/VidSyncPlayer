# MERN Video Subtitler

Welcome to the MERN Video Subtitler project! This application empowers users to seamlessly add custom subtitles to a video file and preview the result in real-time. The project is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Key Features

### 1. Video Selection and Subtitle Creation

- **Video Selection:**
  - Users can easily select a video file through the application interface.

- **Subtitle Input:**
  - Users have the option to input subtitle text.
  - The application allows users to fine-tune start and end times for subtitles in minutes, seconds, and milliseconds from  timestamp input fields.
  - Users can add multiple subtitles for different timestamps in the video.
  - To ensure accuracy, users can click on list items to check the subtitles associated with specific timestamps.

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mern-video-subtitler.git
   cd mern-video-subtitler
   ```

2. Install dependencies:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root  directory with the following variables:

   ```env
   CLIENT_URL = http://localhost:3000
   REACT_APP_BASE_URL = http://localhost:9000
   MONGODB_URL=your_mongo_db_connection_string
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   S3_BUCKET_NAME=your_aws_s3_bucket_name
   ```

    Create a `.env` file in the `client` directory with the following variables:

   ```env
   REACT_APP_BASE_URL:http://localhost:9000
   ```

4. Run the application:

   ```bash
   # To run server : In the 'root dir' directory
   npm run server

   # In the run client : In the 'root dir 'directory
   npm run client

   # OR run server and client concurrently
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to start adding custom subtitles to your videos.

## Technologies Used

- **MongoDB:** Database for storing video and subtitle information.
- **Express.js:** Backend framework for handling API requests.
- **React:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime for server-side development.
- **AWS S3:** Cloud storage for uploading video and subtitle files.
- **Redux Toolkit:** Client side state management.

