import { fileURLToPath } from "url";
import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ExecuteStatementCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: "us-east-1"});
const docClient = DynamoDBDocumentClient.from(client);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const main = async () => {
  const command = new ExecuteStatementCommand({
    Statement: `SELECT id FROM Products`,
  });

  const response = await docClient.send(command);
  
  const idItems = response.Items;
  const putRequests = [];
  idItems.forEach(item => { putRequests.push( {
    PutRequest: {
        Item: {
            "id": { "S": item.id },
            "count": { "N": getRandomInt(50).toString() },
        }
    }
  });

  });
  
  const command2 = new BatchWriteItemCommand({
    RequestItems: {
      Stocks: putRequests
    },
  });
  
  const response2 = await client.send(command2);
  console.log(response2);
  return response2;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
  }