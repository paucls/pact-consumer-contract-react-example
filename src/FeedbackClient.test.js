import Pact from "pact";
import wrapper from "@pact-foundation/pact-node";
import path from "path";
import FeedbackClient from "./FeedbackClient";

describe('Feedback Client', function () {

    const PACT_SERVER_PORT = 1234;
    const PACT_SPECIFICATION_VERSION = 2;

    const pactMockService = wrapper.createServer({
        port: PACT_SERVER_PORT,
        spec: PACT_SPECIFICATION_VERSION,
        log: path.resolve(process.cwd(), '../pact/logs'),
        dir: path.resolve(process.cwd(), '../pact/pacts')
    });

    let provider;

    beforeEach(done => {
        pactMockService.start().then(() => {
            provider = Pact({consumer: 'react-feedback-ui', provider: 'feedback-api', port: 1234});
            done();
        }).catch((err) => catchAndContinue(err, done));
    });

    afterAll(() => {
        wrapper.removeAllServers();
    });

    afterEach((done) => {
        pactMockService.delete().then(() => {
            done();
        }).catch((err) => catchAndContinue(err, done));
    });

    function catchAndContinue(err, done) {
        fail(err);
        done();
    }

    describe('create()', function () {

        const feedback = {
            category: 'Question',
            title: 'Export projects',
            message: 'Is it possible to export projects on this app?'
        };
        const expectedResult = {
            id: '1',
            category: 'Question',
            title: 'Export projects',
            message: 'Is it possible to export projects on this app?'
        };

        beforeEach((done) => {
            provider.addInteraction({
                uponReceiving: 'a request to create a new feedback',
                withRequest: {
                    method: 'POST',
                    path: '/feedbacks',
                    headers: { 'Accept': 'application/json' }
                },
                willRespondWith: {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' },
                    body: expectedResult
                }
            }).then(() => done()).catch((err) => catchAndContinue(err, done));
        });

        afterEach((done) => {
            provider.finalize().then(() => done()).catch((err) => catchAndContinue(err, done));
        });

        it('should create a feedback resource', async() => {
            // Arrange
            const feedbackClient = new FeedbackClient({host: "http://localhost:1234"});

            // Act
            const result = await feedbackClient.create(feedback);

            // Assert
            expect(result).toEqual(expectedResult);
            provider.verify(result);
        });

    });

});
