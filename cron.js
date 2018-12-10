#!/usr/bin/env node
var fs = require('fs');

//function to parse config file into JSON format
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
    return data;
  } catch (e) {
    console.log('Error:', e.stack);
  }
  return;
}

// function to break time from string into hour and minutes
const parseTime = time => {
  const hour = parseInt(time.substring(0, 2), 10);
  const minute = parseInt(time.substring(3), 10);
  if(Number.isNaN(hour) == true || Number.isNaN(minute) == true || hour > 24 || minute > 59) {
    console.log('the time input is invalid. Please ensure your hour and minute inputs are correct and try again');
    return null;
  }
  return { hour, minute };
};

// function to calculate time according to config file, assuming time is already parsed as an object
const calculateTime = (time, config) => {
  let date, hour, minute;

  // minute cases
  minute = config.minute == '*' ? ((config.hour != time.hour && config.hour != '*') ? 00 : time.minute) : config.minute;

  // determine hour cases
  if(config.hour == '*') {
    hour = config.minute == '*' ? time.hour : (config.minute > time.minute ? time.hour : (time.hour == 23 ? 00 : time.hour + 1));
    // determine date
    date = (hour == 00 && time.hour != 00)? 'tomorrow' : 'today' ;
  } else {
    // check if config hour is less than current hour
    hour = config.hour;
    // determine date
    date = config.hour < time.hour ? 'tomorrow' : 'today';
  }

  // check and enforce all 0 values within hour and minute to be 00
  hour = hour == 0 ? '00': hour;
  minute = minute == 0 ? '00': minute;

  // combine everything into string and logs it
  console.log(hour + ':' + minute + ' ' + date + ' ' + '- ' + config.file);
  return {minute, hour, date};

};

// take in the argument from command line input
var args = process.argv.slice(2);
let dataCorrect = true;
let rawTime, config;

// check for command line inputs
if (!args || args.length < 2){
    console.log('please input time and config files');
    dataCorrect = false;
} else {
    rawTime = args[0];
    // initial check on time format
    if (!rawTime.includes(':')){
        console.log('time input format is wrong');
        dataCorrect = false;
    }
    config = args[1];
    // check config input format
    if (typeof(config) != 'string' || !config.includes('.txt')) {
        console.log('config file input is in wrong format');
        dataCorrect = false;
    }
}

if(dataCorrect){
    let data = fetchConfig(config);
    let time = parseTime(rawTime);
    
    if (time != null) {
        data.map(config => {
            calculateTime(time, config);
        })
    };
}