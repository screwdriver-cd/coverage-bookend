'use strict';

const CoverageBase = require('screwdriver-coverage-base');

module.exports = stubsMap => {
    /**
     * Generic coverage class for testing
     * @type {Class}
     */
    const TestCoverageClass = class TestCoverage extends CoverageBase {
        constructor(options) {
            super();

            this.options = options;

            Object.keys(stubsMap).forEach(key => {
                this[key] = stubsMap[key];
            });
        }

        get constructorParams() {
            return this.options;
        }
    };

    return TestCoverageClass;
};
