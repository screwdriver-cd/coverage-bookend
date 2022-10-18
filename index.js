'use strict';

const { BookendInterface } = require('screwdriver-build-bookend');
const logger = require('screwdriver-logger');

class CoverageBookend extends BookendInterface {
    /**
     * Constructor for CoverageBookend
     * @method constructor
     * @param  {Object}  config
     * @param  {String}  config.plugin  Coverage plugin to be used for the coverage teardown bookend
     * @param  {Object}  config.[x]     Options for the coverage plugin
     * @return {CoverageBookend}
     */
    constructor(config) {
        super();

        if (typeof config !== 'object') {
            throw new Error('No coverage config passed in.');
        }

        let CoveragePlugin;
        const pluginName = config.plugin;

        try {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            CoveragePlugin = require(`screwdriver-coverage-${pluginName}`);
        } catch (e) {
            logger.warn(`Coverage plugin ${pluginName} is not supported`);

            return;
        }

        // Set cluster default enable config into specified plugin instance.
        config[pluginName].default = config.default;

        this.coveragePlugin = new CoveragePlugin(config[pluginName]);
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
    getTeardownCommand(config) {
        return this.coveragePlugin.getUploadCoverageCmd(config);
    }
}

module.exports = CoverageBookend;
