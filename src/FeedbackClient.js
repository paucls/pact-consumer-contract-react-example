import axios from "axios";

class FeedbackClient {
    constructor(options) {
        this.host = options.host;
    }

    create(feedback) {
        const headers = {"Accept": "application/json"};

        return axios({
            url: `${this.host}/feedbacks`,
            method: 'POST',
            headers: headers,
            data: feedback
        }).then(function (response) {
            return response.data;
        });
    }
}

export default FeedbackClient;
