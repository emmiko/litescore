const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => res.send('API is running...'));

const url = 'http://www.flashscore.mobi/table-tennis/';

(async () => {
  try {
    const response = await request(url);
    const $ = cheerio.load(response);
    const data = $('#score-data').html();
    const segments = data.split('<h4>');
    const tournaments = [];
    segments.forEach((segment, index) => {
      if (index === 0) return;
      const title = segment.split('</h4>')[0];
      const parts = segment.split('</h4>')[1];
      const pieces = parts.split('<br>');
      const tournament = {};
      tournament.title = title;
      tournament.matches = [];
      console.log(title);
      pieces.forEach((piece, index) => {
        if (index === pieces.length - 1) return;
        let time;
        if (piece.includes('class="live"')) {
          time = piece.match(/<span class="live">(.*)<\/span>/)[1];
        } else if (piece.includes('class="status canceled"') || piece.includes('class="status"')) {
          time = piece.match(/<span>(.*)<\/span>/)[1].split('<span')[0];
        } else {
          time = piece.match(/<span>(.*)<\/span>/)[1];
        }
        let event = piece.match(/<\/span>(.*)<a/)[1].replace('</span>', '').trim();
        let sideOne = event.split(' - ')[0];
        let sideTwo = event.split(' - ')[1];
        const redCardImage = /<img src="\/res\/image\/blank.gif" class="rcard-(.*)">/;
        let sideOneRedCards, sideTwoRedCards;
        if (sideOne.match(redCardImage)) {
          sideOneRedCards = parseInt(sideOne.match(redCardImage)[1]);
        } else {
          sideOneRedCards = 0;
        }
        if (sideTwo.match(redCardImage)) {
          sideTwoRedCards = parseInt(sideTwo.match(redCardImage)[1]);
        } else {
          sideTwoRedCards = 0;
        }
        event = sideOne.replace(redCardImage, '') + ' - ' + sideTwo.replace(redCardImage, '');
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
        const score = piece.match(/<a href="[\s\S]*" class="[\s\S]*">(.*)<\/a>/)[1];
        let setsScore;
        if (
          piece.match(/<img src="\/res\/image\/blank.gif" class="tennis-serve">/) && 
          piece.match(/<a href="[\s\S]*" class="live">/)
        ) {
          setsScore = piece.match(/<\/a> (.*)/)[1];
        } else {
          setsScore = '';
        }
        let sport;
        switch (url) {
          case 'http://www.flashscore.mobi/':
            sport = 'Soccer';
            break;
          case 'http://www.flashscore.mobi/hockey/':
            sport = 'Hockey';
            break;
          case 'http://www.flashscore.mobi/tennis/':
            sport = 'Tennis';
            break;
          case 'http://www.flashscore.mobi/basketball/':
            sport = 'Basketball';
            break;
          case 'http://www.flashscore.mobi/handball/':
            sport = 'Handball';
            break;
          case 'http://www.flashscore.mobi/volleyball/':
            sport = 'Volleyball';
            break;
          case 'http://www.flashscore.mobi/baseball/':
            sport = 'Baseball';
            break;
          case 'http://www.flashscore.mobi/american-football/':
            sport = 'American Football';
            break;
          case 'http://www.flashscore.mobi/rugby-union/':
            sport = 'Rugby Union';
            break;
          case 'http://www.flashscore.mobi/aussie-rules/':
            sport = 'Aussie Rules';
            break;
          case 'http://www.flashscore.mobi/badminton/':
            sport = 'Badminton';
            break;
          case 'http://www.flashscore.mobi/bandy/':
            sport = 'Bandy';
            break;
          case 'http://www.flashscore.mobi/beach-soccer/':
            sport = 'Beach Soccer';
            break;
          case 'http://www.flashscore.mobi/beach-volleyball/':
            sport = 'Beach Volleyball';
            break;
          case 'http://www.flashscore.mobi/boxing/':
            sport = 'Boxing';
            break;
          case 'http://www.flashscore.mobi/cricket/':
            sport = 'Cricket';
            break;
          case 'http://www.flashscore.mobi/darts/':
            sport = 'Darts';
            break;
          case 'http://www.flashscore.mobi/field-hockey/':
            sport = 'Field Hockey';
            break;
          case 'http://www.flashscore.mobi/floorball/':
            sport = 'Floorball';
            break;
          case 'http://www.flashscore.mobi/futsal/':
            sport = 'Futsal';
            break;
          case 'http://www.flashscore.mobi/kabaddi/':
            sport = 'Kabaddi';
            break;
          case 'http://www.flashscore.mobi/mma/':
            sport = 'MMA';
            break;
          case 'http://www.flashscore.mobi/netball/':
            sport = 'Netball';
            break;
          case 'http://www.flashscore.mobi/rugby-league/':
            sport = 'Rugby League';
            break;
          case 'http://www.flashscore.mobi/snooker/':
            sport = 'Snooker';
            break;
          case 'http://www.flashscore.mobi/table-tennis/':
            sport = 'Table Tennis';
            break;
          case 'http://www.flashscore.mobi/water-polo/':
            sport = 'Water Polo';
            break;
          default:
            break;
        }
        let day;
        if (url.includes('?d=-1')) {
          day = 'Yesterday';
        } else if (url.includes('?d=1')) {
          day = 'Tomorrow';
        } else {
          day = 'Today';
        }
        tournament.matches.push(
          { 
            sport,
            time, 
            event, 
            score, 
            sideOneRedCards, // Soccer only
            sideTwoRedCards, // Soccer only
            setsScore, // Tennis only
            status,
            day 
          }
        );
        console.log(
          sport,
          time, 
          event, 
          score, 
          sideOneRedCards, 
          sideTwoRedCards,
          setsScore, 
          status,
          day
        );
      });
      tournaments.push(tournament);
    });
  } catch (error) {
    console.log(error);
  }
})();

const port = 2000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`))