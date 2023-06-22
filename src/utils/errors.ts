export class MongoConnectionError extends Error {
  name = MongoConnectionError.name;

  constructor(message: string) {
    super(message);
  }
}
