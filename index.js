var connect      = require('connect'),
    fs           = require('fs'),
    qs           = require('querystring'),
    url          = require('url'),
    http         = require('http'),
    cheerio      = require('cheerio'),
    request      = require('request'),
    Handlebars   = require('handlebars'),
    unescapeHtml = require('./lib/unescape-html-entity'),
    readability  = require('readabilitySAX');

var templates = {};
templates.index   = Handlebars.compile('' + fs.readFileSync(__dirname + '/templates/index.hbs'));
templates.error   = Handlebars.compile('' + fs.readFileSync(__dirname + '/templates/error.hbs'));
templates.layout  = Handlebars.compile('' + fs.readFileSync(__dirname + '/templates/layout.hbs'));
templates.article = Handlebars.compile('' + fs.readFileSync(__dirname + '/templates/article.hbs'));

var app = module.exports = connect()
  .use(connect.favicon())
  .use(connect.compress())
  .use(connect.static(__dirname + '/public'))
  .use(connect.static(__dirname + '/components'))
  .use(function (req, res, next) {
    var articleUrl = url.parse(decodeURIComponent(req.url.substr(1))),
        queryString;

    if (!articleUrl.href) {
      return res.end(templates.layout({
        title: false,
        body: templates.index({
          title: 'Readable'
        })
      }));
    }

    if (!articleUrl.hostname) {
      queryString = qs.parse(articleUrl.query);

      if (queryString.url) {
        // Redirect to the nice clean URL
        res.writeHead(301, {
          'Location': '/' + encodeURIComponent(queryString.url)
        });
        return res.end();
      }

      res.statusCode = 500;
      return next(new Error('Invalid URL'));
    }

    request(articleUrl.href, function (err) {
      // Could only seem to catch errors by using a callback
      res.statusCode = 500;
      err && next(err);
    }).pipe(readability.createWritableStream({}, function (article) {
      if (!article.score) {
        res.statusCode = 422;
        next(new Error('No article found'));
      }

      var $ = cheerio.load(article.html);

      $('a').each(function () {
        var $this = $(this);
        $this.attr('href', url.resolve(articleUrl.href, $this.attr('href')));
      });

      $('img').each(function () {
        var $this = $(this);
        $this.attr('src', url.resolve(articleUrl.href, $this.attr('src')));
      });

      var title = unescapeHtml(article.title);

      // Super ghetto templating
      return res.end(templates.layout({
        title: title,
        body: templates.article({
          title: title,
          article: $.html(),
          domain: articleUrl.hostname,
          url: articleUrl.href
        }),
        noIndex: true
      }));
    }));
  }).use(function (err, req, res, next) {
    res.end(templates.layout({
      body: templates.error({
        responseCode: res.statusCode || 404,
        message: err.message || 'Not Found'
      }),
      className: 'error',
      noIndex: true
    }));
  });

http.createServer(app).listen(process.env.PORT || 3000);
