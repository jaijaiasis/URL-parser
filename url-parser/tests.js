chai.config.includeStack = false;
chai.config.truncateThreshold = 0;

var testCases = {
  'http://user:pass@foo:21/bar#c': 'http|user|pass|foo|21|/bar|^|c',
  'http://f:00000000000000/c': 'http|^|^|f|0|/c|^|^',
  'http://foo.com:b@d/': 'http|foo.com|b|d|80|/|^|^',
  'foo:/': 'foo|^|^|^|^|/|^|^',
  'madeupscheme:/example.com/': 'madeupscheme|^|^|^|^|/example.com/|^|^',
  'http://www.domain.com/first/second/?test=foo': 'http|^|^|www.domain.com|80|/first/second/|test=foo|^',
  'http://www.domain.com/path#anchor': 'http|^|^|www.domain.com|80|/path|^|anchor',
  'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar': 'http|atpass|foo@bar|127.0.0.1|8080|/path|search=foo|bar',
  'http://user:pass@host.com:81/directory/file.ext?query=1#anchor': 'http|user|pass|host.com|81|/directory/file.ext|query=1|anchor',
  'https://example.com/subjects?name=Web%20Engineering': 'https|^|^|example.com|443|/subjects|name=Web Engineering|^',
  'madeupscheme:/example.com/': 'madeupscheme|^|^|^|^|/example.com/|^|^',
  'http://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space': 'http|^|^|domain.com|80||poo=javascript decode uri + sign to space|^',
  'http://www.domain.com/#!/first/second/?test=foo': 'http|^|^|www.domain.com|80|/|^|!/first/second/?test=foo',
  'file:///home/root/docs/dirs/directory%20with%20spaces': 'file|^|^|^|^|/home/root/docs/dirs/directory with spaces|^|^',
  'http://localhost#why=do&this': 'http|^|^|localhost|80||^|why=do&this',
  'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place': 'http|jack|blarney|www.foo.com|80|/bar/foo/acme|stuff=thing,foo=bar,blarg=snoggle|place',
  'http://u:p@0.0.0.0:1001/a/b/c?one=1&two=2#three': 'http|u|p|0.0.0.0|1001|/a/b/c|one=1,two=2|three',
  'ftp://example.com/': 'ftp|^|^|example.com|21|/|^|^'
};


function assert(url, parsed) {
  parsed = parsed.split(/\|/g);
  var expected = {
    scheme: normalize(parsed[0]),
    authority: {
      username: normalize(parsed[1]),
      password: normalize(parsed[2]),
      host: normalize(parsed[3]),
      port: normalize(parsed[4])
    },
    path: normalize(parsed[5]),
    query: parsed[6] === '^' ? null : parsed[6].split(/,/g).reduce(function(queries, query) {
      var pair = query.split('=');
      queries[pair[0]] = pair[1];
      return queries;
    }, {}),
    fragment: normalize(parsed[7])
  };
  return chai.expect(parse(url)).to.deep.equal(expected);
}


function normalize(value) {
  return value === '^' ? null : value;
}


describe('URL Parser', function() {
  for (var key in testCases) {
    it(key, (function(key) {
      return function() {
        assert(key, testCases[key]);
      };
    })(key));
  }
});
