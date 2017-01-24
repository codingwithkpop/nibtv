var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/scores', function(req, res) {
  request('https://www.reddit.com/r/nba', function(e, r, html) {
    var $ = cheerio.load(html);

    var scores = [];
    $('.md blockquote li').each(function(i, e) {
      if (i > 3) {
        scores.push($(this).text());
      }
    })

    res.send({
      scores: scores
    });
  });
});

app.get('/highlights', function(req, res) {
  request('https://www.youtube.com/channel/UCRUQQrm8_l3CVYxfq2kPMlg/videos', function(e, r, html) {
    var $ = cheerio.load(html);
    var highlights = [];

    $('.yt-lockup-title a').each(function(i, e) {
      highlights.push({
        title: $(this).attr('title'),
        href: $(this).attr('href')
      })
    });

    res.send({
      highlights: highlights
    });
  });
});

app.listen(process.env.PORT || 4567);