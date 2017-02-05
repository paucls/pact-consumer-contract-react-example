import FeedbackClient from './FeedbackClient';
import {feedbackClientFixtures} from "./fixtures/feedback-client";

describe('create feedback', function () {

    it('should create a feedback resource', async () => {
        // Arrange
        const feedback = feedbackClientFixtures.getFeedback;
        const expectedResult = feedbackClientFixtures.getFeedback;
        const feedbackClient = new FeedbackClient({host: "http://localhost:1234"});

        // Act
        const result = await feedbackClient.create(feedback);

        // Assert
        expect(result).toEqual(expectedResult);
    });

});
