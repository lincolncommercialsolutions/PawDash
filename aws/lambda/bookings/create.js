const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.log('Create booking event:', JSON.stringify(event, null, 2));

  try {
    const body = JSON.parse(event.body);
    const { userId, petId, serviceType, timing, scheduledTime, specialInstructions, location } = body;

    // Validate required fields
    if (!userId || !petId || !serviceType || !timing) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const bookingId = randomUUID();
    const timestamp = new Date().toISOString();

    const booking = {
      bookingId,
      userId,
      petId,
      serviceType,
      timing,
      scheduledTime: scheduledTime || null,
      specialInstructions: specialInstructions || '',
      location: location || {},
      status: 'pending', // pending, dispatched, accepted, in-progress, completed, cancelled
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await docClient.send(new PutCommand({
      TableName: process.env.BOOKINGS_TABLE,
      Item: booking,
    }));

    // If ASAP booking, trigger dispatch (in real implementation)
    // This would invoke the dispatch function
    console.log('Booking created, ready for dispatch');

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Booking created successfully',
        booking,
      }),
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to create booking' }),
    };
  }
};
