import axios from "axios";

export default class SubscribersNotifier {
  subscribers: string[];
  constructor() {
    this.subscribers = ["http://api:3000/image"];
  }
  async notify(imageId: string, source: Buffer) {
    const form = new FormData();
    form.append("resizedImage", new Blob([source]));
    const subscribersEndpoints = this.subscribers.map(
      (endpoint: string) => `${endpoint}/${imageId}`
    );
    const notificationPromises = subscribersEndpoints.map((endpoint) =>
      axios.post(endpoint, form)
    );
    const result = await Promise.allSettled(notificationPromises);
    console.log("Notify subscribers result is: ", result);
  }
}
