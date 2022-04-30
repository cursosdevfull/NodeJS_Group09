class DynamoDBConnector {
  region: string;
  static instance: DynamoDBConnector;

  private constructor() {
    this.region = "us-east-1";
  }

  static create() {
    if (!this.instance) {
      this.instance = new DynamoDBConnector();
    }

    return this.instance;
  }
}

const instance01 = DynamoDBConnector.create();
console.log(instance01.region);
const instance02 = DynamoDBConnector.create();
console.log(instance02.region);
