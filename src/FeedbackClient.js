class FeedbackClient {
    constructor(options) {
        this.host = options.host;
    }

    create(feedback) {
        return feedback;
    }
}

export default FeedbackClient;
