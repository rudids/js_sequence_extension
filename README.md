Github Sequence Diagrams
========================

Allows sequence diagrams to be embedded inside of Github issues.  Based on http://bramp.github.io/js-sequence-diagrams/.

This extension will allow you to add sequence diagrams into your Github issues seamlessly.

It is based on the amazing library created by Andrew Brampton which can be found at http://bramp.github.io/js-sequence-diagrams/.

To get to grips with the syntax of the sequence diagrams please visit Andrew's page listed above.

Getting Started:
================

The only thing you need to do in order to embed a sequence diagram into a Github issue is to surround the JS Sequence Diagram syntax inside a fenced code block and specifying the language of the code block as "jsseq" as per Github Flavoured Markdown.

Example:
========

```jsseq
BG->AM: Pass ID
AM->Trillion: Validate ID
Trillion->AM: Validated
AM->BG: Token
AM-->Karen: Hello
Karen->BG: My boots are mine
```
