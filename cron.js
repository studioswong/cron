#!/usr/bin/env node
var fs = require('fs');

// take in the argument from command line input
var args = process.argv.slice(2);

const rawTime = args[0];
const config = args[1];

// parse config file into JSON format
function fetchConfig(config) {
  try {
    let data = fs.readFileSync(config, 'utf8')
      .trim()
      .split(/\r?\n/)
      .map(line => {
        let lineArr = line.split(" ");
        return {
          minute: lineArr[0],
          hour: lineArr[1],
          file: lineArr[2],
        }
      });
    console.log(data);
    return data;
  } catch (e) {
    console.log('Error:', e.stack);
  }
  return;
}

// break time from string into hour and minutes
const parseTime = time => {
    // NEXT STEP: check and verify input to be right format 
  const hour = parseInt(time.substring(0, 2), 10);
  const minute = parseInt(time.substring(3), 10);
  return { hour, minute };
};

// calculates time according to config file, assuming time is already parsed as an object
const calculateTime = (time, config) => {
  let date, hour, minute;

  // minute cases
  minute = config.minute == '*' ? ((config.hour != time.hour && config.hour != '*') ? '00' : time.minute) : config.minute;

  // determine hour cases
  if(config.hour == '*') {
    hour = config.minute == '*' ? time.hour : (config.minute > time.minute ? time.hour : (time.hour == 23 ? '00' : time.hour + 1));
    // determine date
    date = hour == '00' ? 'tomorrow' : 'today' ;
  } else {
    // check if config hour is less than current hour
    hour = config.hour;
    // determine date
    date = config.hour < time.hour ? 'tomorrow' : 'today';
  }

  // combine everything into string and logs it
  console.log(hour + ':' + minute + ' ' + date + ' ' + '- ' + config.file);

};

let data = fetchConfig(config);
let time = parseTime(rawTime);

data.map(config => {
  calculateTime(time, config);
})
