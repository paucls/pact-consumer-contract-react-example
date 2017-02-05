import Pact from 'pact';
import wrapper from '@pact-foundation/pact-node';
import path from 'path';

import FeedbackClient from "./FeedbackClient";
import {feedbackClientFixtures} from "./fixtures/feedback-client";

const PACT_SERVER_PORT = 1234;
const PACT_SPECIFICATION_VERSION = 2;

const mockEventsService = wrapper.createServer({
    port: PACT_SERVER_PORT,
    spec: PACT_SPECIFICATION_VERSION,
    log: path.resolve(process.cwd(), '../pact/logs'),
    dir: path.resolve(process.cwd(), '../pact/pacts')
});

let provider;

beforeEach((done) => {
    mockEventsService.start().then(() => {
        provider = Pact({consumer: 'react-feedback-ui', provider: 'feedback-api', port: 1234})
        done();
    }).catch((err) => catchAndContinue(err, done));
});

afterAll(() => {
    wrapper.removeAllServers();
});

afterEach((done) => {
    mockEventsService.delete().then(() => {
        done();
    })
        .catch((err) => catchAndContinue(err, done));
});

function catchAndContinue(err, done) {
    fail(err);
    done();
}

describe('Feedback Client', function () {

    describe('create feedback', function () {

        it('should create a feedback resource', async() => {
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

});
