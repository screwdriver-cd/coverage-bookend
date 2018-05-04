# Coverage Bookend
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][status-image]][status-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

> Screwdriver bookend for uploading code coverage reports and/or test results

## Usage

```bash
npm install screwdriver-coverage-bookend
```

## Constructor
This bookend will try to register a Screwdriver coverage npm module based on your configuration provided.

### Example

```yaml
coverage:
    plugin: sonar
    sonar:
        foo: bar
```
In this example, this bookend will register the `screwdriver-coverage-sonar` npm module with the config `foo: bar`.

## Setup
This bookend does nothing during setup.

## Teardown
This bookend will call `getUploadCoverageCmd` from the `screwdriver-coverage-sonar` npm module during teardown. The plugin should follow the [coverage-base](https://github.com/screwdriver-cd/coverage-base) interface.

## Testing

```bash
npm test
```

## License

Code licensed under the BSD 3-Clause license. See LICENSE file for terms.

[npm-image]: https://img.shields.io/npm/v/screwdriver-coverage-bookend.svg
[npm-url]: https://npmjs.org/package/screwdriver-coverage-bookend
[downloads-image]: https://img.shields.io/npm/dt/screwdriver-coverage-bookend.svg
[license-image]: https://img.shields.io/npm/l/screwdriver-coverage-bookend.svg
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/screwdriver-coverage-bookend.svg
[issues-url]: https://github.com/screwdriver-cd/screwdriver-coverage-bookend/issues
[status-image]: https://cd.screwdriver.cd/pipelines/707/badge
[status-url]: https://cd.screwdriver.cd/pipelines/707
[daviddm-image]: https://david-dm.org/screwdriver-cd/screwdriver-coverage-bookend.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/screwdriver-coverage-bookend
