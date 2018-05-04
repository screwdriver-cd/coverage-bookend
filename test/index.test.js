'use strict';

const assert = require('chai').assert;
const mockery = require('mockery');
const sinon = require('sinon');
const testCoverage = require('./data/testCoverage');
let CoverageBookend;

describe('index test', () => {
    let bookend;
    const exampleCoverageMock = {
        _getAccessToken: sinon.stub(),
        _getUploadCoverageCmd: sinon.stub().resolves('Command to upload coverage')
    };
    const config = {
        plugin: 'example',
        example: {
            foo: 'bar'
        }
    };

    before(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    beforeEach(() => {
        mockery.registerMock('screwdriver-coverage-example',
            testCoverage(exampleCoverageMock));

        // eslint-disable-next-line global-require
        CoverageBookend = require('../index');

        bookend = new CoverageBookend(config);
    });

    afterEach(() => {
        mockery.deregisterAll();
    });

    after(() => {
        mockery.disable();
    });

    describe('constructor', () => {
        it('constructs a bookend', () => {
            assert.ok(bookend);
            assert.property(bookend, 'getSetupCommand');
            assert.property(bookend, 'getTeardownCommand');
        });

        it('throws an error when the coverage config is not an object', () => {
            const error = new Error('No coverage config passed in.');

            try {
                bookend = new CoverageBookend('meow');
            } catch (err) {
                assert.deepEqual(err, error);

                return;
            }
            assert.fail();
        });

        it('does not throw an error when a npm module cannot be registered', () => {
            try {
                bookend = new CoverageBookend({
                    plugin: 'doesnotexist',
                    example: {
                        config: {
                            fake: 'meow'
                        }
                    }
                });
            } catch (err) {
                assert.fail(err, '');
            }
        });
    });

    it('getSetupCommand', () =>
        bookend.getSetupCommand().then((result) => {
            assert.strictEqual(result, '');
        })
    );

    it('getTeardownCommand', () => {
        bookend.getTeardownCommand().then(result =>
            assert.deepEqual(result, 'Command to upload coverage')
        );
    });
});
