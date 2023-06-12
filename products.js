import { fileURLToPath } from "url";
import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import data from './data.json' assert {type: 'json'};
  
  const client = new DynamoDBClient({ region: "us-east-1" });
  
  export const main = async () => {
  const putRequests = [];
  data.forEach(item => { putRequests.push( {
    PutRequest: {
        Item: {
            "id": { "S": uuidv4() },
            "title": { "S": item.title },
            "description": { "S": item.description },
            "price": { "N": item.price.toString() },
        }
      }
    });
  });

    const command = new BatchWriteItemCommand({
      RequestItems: {
        Products: putRequests
      },
    });
  
    const response = await client.send(command);
    console.log(response);
    return response;
  };
  
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
  }