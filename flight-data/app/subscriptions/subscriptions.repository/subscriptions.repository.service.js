const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4');

class SubscriptionsRepositoryService {

  async addSubscription(uri) {
    let subscriptions = await this.readSubscriptionsFile()

    let id = uuidv4()
    let password = uuidv4()

    let subscription = {
      "id": id,
      "password": password,
      "uri" : uri
    }

    subscriptions.push(subscription)

    console.log(subscriptions)

    this.writeSubscriptionsFile(subscriptions)

    return subscription
  }

  async deleteSubscription(id, password) {

  }

  async readSubscriptionsFile() {
    let file = path.join(__dirname, './subscriptions.json')
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  }

  async writeSubscriptionsFile(subscriptions) {
    var jsonContent = JSON.stringify(subscriptions);
    let jsonPath = path.join(__dirname, './subscriptions.json')
    console.log(jsonContent);

    fs.writeFile(jsonPath, jsonContent, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  }
} 

module.exports = SubscriptionsRepositoryService
