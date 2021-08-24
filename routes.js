const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Soccer';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/hockey/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Hockey';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/tennis/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Tennis';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/basketball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Basketball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/handball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Handball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/volleyball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Volleyball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/baseball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Baseball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/american-football/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'American Football';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/rugby-union/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Rugby Union';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/aussie-rules/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Aussie Rules';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/badminton/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Badminton';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/bandy/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Bandy';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/beach-soccer/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Beach Soccer';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/beach-volleyball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Beach Volleyball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/boxing/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Boxing';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/cricket/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Cricket';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/darts/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Darts';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/field-hockey/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Field Hockey';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/floorball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Floorball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/futsal/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Futsal';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/kabaddi/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Kabaddi';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/mma/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'MMA';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/netball/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Netball';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/rugby-league/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Rugby League';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/snooker/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Snooker';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/table-tennis/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Table Tennis';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/water-polo/', (req, res) => {
  const {d, s} = req.query;
  try {
    const sport = 'Water Polo';
    let day, status;
    if (d === '-1' && !s) {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '1' && !s) {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (!d && s === '1') {
      day = 'Today';
      status = 'All Games';
    } else if (!d && s === '2') {
      day = 'Today';
      status = 'Live';
    } else if (!d && s === '3') {
      day = 'Today';
      status = 'Finished';
    } else if (d === '-1' && s === '1') {
      day = 'Yesterday';
      status = 'All Games';
    } else if (d === '-1' && s === '3') {
      day = 'Yesterday';
      status = 'Finished';
    } else if (d === '1' && s === '1') {
      day = 'Tomorrow';
      status = 'All Games';
    } else if (d === '1' && s === '3') {
      day = 'Tomorrow';
      status = 'Finished';
    } else if (!d && !s) {
      day = 'Today';
      status = 'All Games';
    }
    let parameterAllGames, parameterFinished;
    if (day === 'Today') {
      parameterAllGames = '?s=1';
      parameterFinished = '?s=3';
    } else if (day === 'Yesterday') {
      parameterAllGames = '?d=-1&s=1';
      parameterFinished = '?d=-1&s=3';
    } else if (day === 'Tomorrow') {
      parameterAllGames = '?d=1&s=1';
      parameterFinished = '?d=1&s=3';
    }
    const file = path.join(__dirname, `database/${day.toLowerCase()}.json`);
    const information = JSON.parse(fs.readFileSync(file));
    const data = information.filter(info => info.name === sport);
    let tournaments;
    if (status === 'All Games') {
      tournaments = data[0].tournaments;
    } else if (status === 'Live') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentInProgress = {};
        tournamentInProgress.matches = [];
        tournament.matches.forEach(match => {
          if (match.status === 'Live') {
            tournamentInProgress.title = tournament.title;
            tournamentInProgress.matches.push(match);
          }
        });
        if (tournamentInProgress.matches.length > 0) {
          tournaments.push(tournamentInProgress);
        }
      });
    } else if (status === 'Finished') {
      tournaments = [];
      data[0].tournaments.forEach(tournament => {
        const tournamentDone = {};
        tournamentDone.matches = [];
        tournament.matches.forEach(match => {
          if (
            match.status === 'Finished' || 
            match.status === 'Postponed' || 
            match.status === 'Canceled'
          ) {
            tournamentDone.title = tournament.title;
            tournamentDone.matches.push(match);
          }
        });
        if (tournamentDone.matches.length > 0) {
          tournaments.push(tournamentDone);
        }
      });
    }
    res.render('index', {
      path: req.path, 
      parameterAllGames,
      parameterFinished, 
      sport, 
      day, 
      status, 
      tournaments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;