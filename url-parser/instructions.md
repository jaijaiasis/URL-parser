# Lab Exercise 01: URL Parser

You are asked to implement a function `parse` which will parse a given URL into
its different URI components.


## Specification

### Input
1. The `parse` function accepts a single parameter, which is the string
  representation of the URL to be parsed.
2. The URL parameter can be assumed to be always valid, conforming to the
  Generic URI Syntax.
3. The URL parameter may contain percent-encoded characters. These need to be
  decoded back to the original characters in the parsed output.

### Output
4. The `parse` function must return a Javascript object containing the parsed
  URI components.
5. If a URI component is not available in the given URL, it's value should be
  set to `null`.
6. The __authority__ component should be broken further into an object which
  contains its subcomponents.
7. The __path__ component is always defined. It must either be an empty string
  or must start with a forward slash `/`.
8. The __query__ component should be broken further into an object which
  contains the different key-value pairs it contains.
9. If the __port__ component is not defined in the given URL, use the default
  port number for the scheme being used, if available.


## Example

Parsign the following input URL:

```
https://example.com/subjects?name=Web%20Engineering
```

should result to the following Javascript object:

```
{
  scheme: 'https',
  authority: {
    username: null,
    password: null,
    host: 'example.com',
    port: 443
  },
  path: '/subjects',
  query: {
    name: 'Web Engineering'
  },
  fragment: null
}
```


## File Structure

In this directory you will find the following files and directories:

- `lib`
- `index.html`
- `index.js`
- `instructions.md`
- `tests.js`

You are only allowed to modify the `index.js` file to implement your `parse`
function.

Tests are also provided in the `tests.js` file, so that you can constantly
keep track of the completeness of your implementation. Note that this will not
be the actual tests that will be used when checking your implementations, but
passing all the initial tests should make you confident that you're on the
right track.

To run the tests, open `index.html` in your browser. It should show how many
tests passed or failed.


## Additional Notes

- You may implement additional functions as you need, as long as the `parse`
  function behaves as specified in the instructions. Have fun! :)
- In case of confusions over any part of the URI syntax from the discussions
  and from other online references, refer to the official URI: Generic Syntax
  document (https://tools.ietf.org/html/rfc3986). Whatever it says is what's
  going to be followed.
