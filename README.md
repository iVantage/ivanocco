#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Release note generator for Trello Scrum boards


## Install

```sh
$ npm install --save ivanocco
```


## Usage

Command-line options:

```
--apiKey          [string]    Your Trello API key
--token           [string]    Your Trello API token
--boardId         [string]    The id of the Trello sprint board
--releaseCard     [string]    The name of the card containing release notes
--doneList        [string]    The name of the list containing "done" stories
--donedoneDomain  [string]    The domain of your DoneDone account
--outFile         [string]    Name of the generated file
```


```sh
$ npm install --global ivanocco
$ ivanocco --help
```


## License

MIT © [Clayton Donahue](www.ivantagehealth.com)


[npm-image]: https://badge.fury.io/js/ivanocco.svg
[npm-url]: https://npmjs.org/package/ivanocco
[travis-image]: https://travis-ci.org/cdonahue/ivanocco.svg?branch=master
[travis-url]: https://travis-ci.org/cdonahue/ivanocco
[daviddm-image]: https://david-dm.org/cdonahue/ivanocco.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cdonahue/ivanocco
