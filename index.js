const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

AWS.config.update({region: 'us-east-1'});

const queueUrl = "https://sqs.us-east-1.amazonaws.com/361965706875/search-service-queue.fifo";

const processSearchMessage = (message) =>{
  console.info('Search Message', message);
}

const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (message) => {
    processSearchMessage(message);
  },
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

console.log('Search service is running...');
app.start();
