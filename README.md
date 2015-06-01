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
--api-key          [string]    Your Trello API key
--token            [string]    Your Trello API token
--board-id         [string]    The id of the Trello sprint board
--release-card     [string]    The name of the card containing release notes
--done-list        [string]    The name of the list containing "done" stories
--donedone-domain  [string]    The domain of your DoneDone account
--ou-fFile         [string]    Name of the generated file
```

These values can be stored in a `.ivanoccorc` file in your current working directory.

## License

MIT © [Clayton Donahue](www.ivantagehealth.com)
