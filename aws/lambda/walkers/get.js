const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.log('Get walker event:', JSON.stringify(event, null, 2));

  try {
    const walkerId = event.pathParameters?.id;

    if (!walkerId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Walker ID is required' }),
      };
    }

    const result = await docClient.send(new GetCommand({
      TableName: process.env.WALKERS_TABLE,
      Key: { walkerId },
    }));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Walker not found' }),
      };
    }

    // Remove sensitive information before returning
    const { phone, address, ...publicWalkerInfo } = result.Item;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(publicWalkerInfo),
    };
  } catch (error) {
    console.error('Error getting walker:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to get walker' }),
    };
  }
};
