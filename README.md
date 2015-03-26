# ivanocco

> Release note generator for Trello Scrum boards

Bare-bones "convention-over-configuration" release note generator for a Trello-based sprint board. Outputs a formatted HTML
file containing a list of completed stories and DoneDone issues from the given sprint.

Initial implementation borrows from `ivanello` and `node-donedone-api`.

Todo:

- Show sprint image and timebox?
- Incorporate data from multiple sprints?
- Run as web application?
- Show title of DoneDone issue?

## Install

```sh
$ npm install -g ivanocco
```

## Usage (cli)

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

## License

MIT © [Clayton Donahue](www.ivantagehealth.com)
