import axios from "axios";

class FeedbackClient {
    constructor(options) {
        this.host = options.host;
    }

    create(feedback) {
        const headers = {"Accept": "application/json"};

        return axios.post(`${this.host}/events`, feedback, headers)
            .then(function (response) {
                return response.data;
            });

    }
}

export default FeedbackClient;
