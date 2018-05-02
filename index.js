'use strict';

const { BookendInterface } = require('screwdriver-build-bookend');

class CoverageBookend extends BookendInterface {
    /**
     * Constructor for CoverageBookend
     * @method constructor
     * @param  {Object}  coveragePlugin Coverage plugin to be used for the coverage teardown bookend
     * @return {CoverageBookend}
     */
    constructor(coveragePlugin) {
        super();
        this.coveragePlugin = coveragePlugin;
    }

    /**
     * Gives the commands needed for setting up coverage before the build starts.
     * Currently, there is nothing to set up
     * @method getSetupCommand
     * @return {Promise}           Resolves to an empty string
     */
    getSetupCommand() {
        return Promise.resolve('');
    }

    /**
     * Gives the commands needed for uploading coverage reports after a build completes.
     * @method getTeardownCommand
     * @return {Promise}           Resolves to a string that represents the commmand to execute
     */
    getTeardownCommand() {
        return this.coveragePlugin.uploadCoverage();
    }
}

module.exports = CoverageBookend;
