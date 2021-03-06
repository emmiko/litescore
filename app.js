const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

const anchors = [
  {href: 'http://www.flashscore.mobi/', title: 'Soccer'},
  {href: 'http://www.flashscore.mobi/hockey/', title: 'Hockey'},
  {href: 'http://www.flashscore.mobi/tennis/', title: 'Tennis'},
  {href: 'http://www.flashscore.mobi/basketball/', title: 'Basketball'},
  {href: 'http://www.flashscore.mobi/handball/', title: 'Handball'},
  {href: 'http://www.flashscore.mobi/volleyball/', title: 'Volleyball'},
  {href: 'http://www.flashscore.mobi/baseball/', title: 'Baseball'},
  {href: 'http://www.flashscore.mobi/american-football/', title: 'American Football'},
  {href: 'http://www.flashscore.mobi/rugby-union/', title: 'Rugby Union'},
  {href: 'http://www.flashscore.mobi/aussie-rules/', title: 'Aussie Rules'},
  {href: 'http://www.flashscore.mobi/badminton/', title: 'Badminton'},
  {href: 'http://www.flashscore.mobi/bandy/', title: 'Bandy'},
  {href: 'http://www.flashscore.mobi/beach-soccer/', title: 'Beach Soccer'},
  {href: 'http://www.flashscore.mobi/beach-volleyball/', title: 'Beach Volleyball'},
  {href: 'http://www.flashscore.mobi/boxing/', title: 'Boxing'},
  {href: 'http://www.flashscore.mobi/cricket/', title: 'Cricket'},
  {href: 'http://www.flashscore.mobi/darts/', title: 'Darts'},
  {href: 'http://www.flashscore.mobi/field-hockey/', title: 'Field Hockey'},
  {href: 'http://www.flashscore.mobi/floorball/', title: 'Floorball'},
  {href: 'http://www.flashscore.mobi/futsal/', title: 'Futsal'},
  {href: 'http://www.flashscore.mobi/kabaddi/', title: 'Kabaddi'},
  {href: 'http://www.flashscore.mobi/mma/', title: 'MMA'},
  {href: 'http://www.flashscore.mobi/netball/', title: 'Netball'},
  {href: 'http://www.flashscore.mobi/rugby-league/', title: 'Rugby League'},
  {href: 'http://www.flashscore.mobi/snooker/', title: 'Snooker'},
  {href: 'http://www.flashscore.mobi/table-tennis/', title: 'Table Tennis'},
  {href: 'http://www.flashscore.mobi/water-polo/', title: 'Water Polo'}
];

const scrape = async day => {
  let parameter;
  if (day === 'Today') {
    parameter = '';
  } else if (day === 'Yesterday') {
    parameter = '?d=-1';
  } else if (day === 'Tomorrow') {
    parameter = '?d=1';
  } else {
    console.log('Error: Invalid argument. Enter "Today", "Yesterday", or "Tomorrow".');
    process.exit(0);
  }
  try {
    const sports = [];
    for (let index = 0; index < anchors.length; index++) {
      const anchor = anchors[index];
      const url = anchor.href + parameter;
      const response = await request({
        uri: url,
        method: 'GET',
        headers: {
          'Connection': 'keep-alive',
          'Accept-Encoding': '',
          'Accept-Language': 'en-US,en;q=0.8'
        }
      });
      const $ = cheerio.load(response);
      const data = $('#score-data').html();
      const segments = data.split('<h4>');
      const sport = {};
      sport.name = anchor.title;
      sport.tournaments = [];
      console.log(sport.name);
      for (let index = 0; index < segments.length; index++) {
        if (index === 0) continue;
        const segment = segments[index];
        const title = segment.split('</h4>')[0];
        let parts = segment.split('</h4>')[1];
        if (parts.includes('Awaiting<br>updates')) parts = parts.replace(/Awaiting<br>updates/g, 'Awaiting updates');
        if (parts.includes('Set 1<br>Tiebreak')) parts = parts.replace(/Set 1<br>Tiebreak/g, 'Set 1 Tiebreak');
        if (parts.includes('Set 2<br>Tiebreak')) parts = parts.replace(/Set 2<br>Tiebreak/g, 'Set 2 Tiebreak');
        const pieces = parts.split('<br>');
        const tournament = {};
        tournament.title = title;
        tournament.matches = [];
        console.log(tournament.title);
        for (let index = 0; index < pieces.length; index++) {
          if (index === pieces.length - 1) continue;
          const piece = pieces[index];
          let time;
          if (piece.includes('class="live"')) {
            time = piece.match(/<span class="live">(.*)<\/span>/)[1];
          } else if (piece.includes('class="status canceled"') || piece.includes('class="status"')) {
            time = piece.match(/<span>(.*)<\/span>/)[1].split('<span')[0];
          } else {
            time = piece.match(/<span>(.*)<\/span>/)[1];
          }
          const event = piece.match(/<\/span>(.*)<a/)[1].replace('</span>', '').replace(/&amp;/g, '&').trim();
          let sideOne = event.split(' - ')[0];
          let sideTwo = event.split(' - ')[1];
          const score = piece.match(/<a href="[\s\S]*" class="[\s\S]*">(.*)<\/a>/)[1];
          let status;
          if (piece.includes('class="sched"')) {
            status = 'Scheduled';
          } else if (piece.includes('class="status canceled"')) {
            status = 'Postponed';
          } else if (piece.includes('class="status"')) {
            status = 'Canceled';
          } else if (piece.includes('class="live"')) {
            status = 'Live';
          } else if (piece.includes('class="fin"')) {
            status = 'Finished';
          }
          const data = {time, sideOne, sideTwo, score, status};
          if (anchor.title === 'Soccer') {
            let sideOneRedCards, sideTwoRedCards;
            const redCardClass = 'rcard-';
            if (sideOne.includes(redCardClass)) {
              sideOneRedCards = parseInt(sideOne.match(/"rcard-(.*)"/)[1]);
            } else {
              sideOneRedCards = 0;
            }
            if (sideTwo.includes(redCardClass)) {
              sideTwoRedCards = parseInt(sideTwo.match(/"rcard-(.*)"/)[1]);
            } else {
              sideTwoRedCards = 0;
            }
            const sideOneRedCardImage = `<img src="/res/image/blank.gif" class="rcard-${sideOneRedCards}">`;
            const sideTwoRedCardImage = `<img src="/res/image/blank.gif" class="rcard-${sideTwoRedCards}">`;
            data.sideOne = sideOne.replace(sideOneRedCardImage, '');
            data.sideTwo = sideTwo.replace(sideTwoRedCardImage, '');
            data.sideOneRedCards = sideOneRedCards;
            data.sideTwoRedCards = sideTwoRedCards;
          }
          if (anchor.title === 'Tennis') {
            const tennisServe = 'tennis-serve';
            let setsScore;
            if (
              piece.match(/<img src="\/res\/image\/blank.gif" class="tennis-serve">/) && 
              piece.match(/<a href="[\s\S]*" class="live">/)
            ) {
              setsScore = piece.match(/<\/a> (.*)/)[1];
            } else {
              setsScore = '';
            }
            const tennisServeImage = '<img src="/res/image/blank.gif" class="tennis-serve">';
            data.sideOne = sideOne.replace(tennisServeImage, '');
            data.sideTwo = sideTwo.replace(tennisServeImage, '');
            data.isSideOneTennisServe = sideOne.includes(tennisServe);
            data.isSideTwoTennisServe = sideTwo.includes(tennisServe);
            data.setsScore = setsScore;
          }
          if (anchor.title === 'Baseball') {
            const baseballServe = 'baseball-serve';
            const baseballServeOpp = 'baseball-serve-opposite';
            const baseballServeImage = '<img src="/res/image/blank.gif" class="baseball-serve">';
            const baseballServeOppImage = '<img src="/res/image/blank.gif" class="baseball-serve-opposite">';
            data.sideOne = sideOne.replace(baseballServeImage, '').replace(baseballServeOppImage, '');
            data.sideTwo = sideTwo.replace(baseballServeImage, '').replace(baseballServeOppImage, '');
            data.isSideOneBaseballServe = sideOne.includes(baseballServe);
            data.isSideTwoBaseballServe = sideTwo.includes(baseballServe);
            data.isSideOneBaseballServeOpp = sideOne.includes(baseballServeOpp);
            data.isSideTwoBaseballServeOpp = sideTwo.includes(baseballServeOpp);
          }
          if (anchor.title === 'Cricket') {
            const cricketBowling = 'cricket-bowling';
            const cricketBatting = 'cricket-batting';
            const cricketBowlingImage = '<img src="/res/image/blank.gif" class="cricket-bowling">';
            const cricketBattingImage = '<img src="/res/image/blank.gif" class="cricket-batting">';
            data.sideOne = sideOne.replace(cricketBowlingImage, '').replace(cricketBattingImage, '');
            data.sideTwo = sideTwo.replace(cricketBowlingImage, '').replace(cricketBattingImage, '');
            data.isSideOneCricketBowling = sideOne.includes(cricketBowling);
            data.isSideTwoCricketBowling = sideTwo.includes(cricketBowling);
            data.isSideOneCricketBatting = sideOne.includes(cricketBatting);
            data.isSideTwoCricketBatting = sideTwo.includes(cricketBatting);
          }
          console.log(data);
          tournament.matches.push(data);
        }
        sport.tournaments.push(tournament);
      }
      sports.push(sport);
    }
    fs.writeFileSync(`database/${day.toLowerCase()}.json`, JSON.stringify(sports));
  } catch (error) {
    console.log(error);
  }
};

const time = '1 0 * * *'; // 00:01:00
setInterval(scrape, 120000, 'Today'); // 2 min.
schedule.scheduleJob(time, () => scrape('Yesterday'));
schedule.scheduleJob(time, () => scrape('Tomorrow'));

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server running on port ${port}`));