const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Dispatch walker matching algorithm
 * Finds available walkers within radius, filters by rating and compatibility
 */
exports.handler = async (event) => {
  console.log('Dispatch event:', JSON.stringify(event, null, 2));

  try {
    const body = JSON.parse(event.body);
    const { bookingId, location, petRequirements } = body;

    if (!bookingId || !location) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Query available walkers
    const result = await docClient.send(new QueryCommand({
      TableName: process.env.WALKERS_TABLE,
      IndexName: 'StatusIndex',
      KeyConditionExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': 'available',
      },
    }));

    const availableWalkers = result.Items || [];

    if (availableWalkers.length === 0) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'No available walkers found',
          message: 'Please try again later or schedule for a specific time'
        }),
      };
    }

    // Filter walkers by location (simplified - in production, use geospatial queries)
    // Filter by rating (minimum 4.0)
    // Filter by certifications if needed
    const matchedWalkers = availableWalkers
      .filter(walker => walker.rating >= 4.0)
      .map(walker => ({
        walkerId: walker.walkerId,
        name: walker.name,
        rating: walker.rating,
        distance: calculateDistance(location, walker.location), // Simplified
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5); // Get top 5 closest walkers

    // Update booking status to dispatched
    await docClient.send(new UpdateCommand({
      TableName: process.env.BOOKINGS_TABLE,
      Key: { bookingId },
      UpdateExpression: 'SET #status = :status, dispatchedWalkers = :walkers, updatedAt = :timestamp',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': 'dispatched',
        ':walkers': matchedWalkers.map(w => w.walkerId),
        ':timestamp': new Date().toISOString(),
      },
    }));

    // In production, send push notifications to matched walkers here

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Booking dispatched to available walkers',
        matchedWalkers: matchedWalkers.length,
        estimatedMatchTime: '2-5 minutes',
      }),
    };
  } catch (error) {
    console.error('Error dispatching walker:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to dispatch walker' }),
    };
  }
};

// Simplified distance calculation (Haversine formula in production)
function calculateDistance(loc1, loc2) {
  if (!loc1 || !loc2) return 999;
  const lat1 = loc1.lat || 0;
  const lon1 = loc1.lng || 0;
  const lat2 = loc2.lat || 0;
  const lon2 = loc2.lng || 0;
  
  // Simplified Manhattan distance for demo
  return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2);
}
