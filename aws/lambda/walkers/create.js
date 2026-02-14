const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.log('Create walker event:', JSON.stringify(event, null, 2));

  try {
    const body = JSON.parse(event.body);
    const { name, email, phone, address, experience, availability, certifications } = body;

    // Validate required fields
    if (!name || !email || !phone || !address) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const walkerId = randomUUID();
    const timestamp = new Date().toISOString();

    const walker = {
      walkerId,
      name,
      email,
      phone,
      address,
      experience: experience || '',
      availability: availability || '',
      certifications: certifications || '',
      status: 'pending_verification', // pending_verification, active, suspended, inactive
      rating: 0,
      totalWalks: 0,
      isAvailable: false,
      location: {}, // Will be updated when walker goes online
      backgroundCheckStatus: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await docClient.send(new PutCommand({
      TableName: process.env.WALKERS_TABLE,
      Item: walker,
    }));

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Walker application submitted successfully',
        walkerId,
        nextSteps: [
          'Complete background check',
          'Identity verification',
          'Pet handling orientation',
          'Sign contractor agreement'
        ],
      }),
    };
  } catch (error) {
    console.error('Error creating walker:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to submit walker application' }),
    };
  }
};
