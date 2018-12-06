#!/usr/bin/env node

// take in the argument from command line input
var args = process.argv.slice(2);

const time = args[0];
const config = args[1];
console.log('your time input is', time);
console.log('your config file is', config);

// parse config file into JSON format

// break time from string into hour and minutes
const parseTime = time => {
  const hour = parseInt(time.substring(0, 2), 10);
  const minute = parseInt(time.substring(3), 10);
  return { hour, minute };
};

console.log(parseTime(time));

// calculates time according to config file, assuming time is already parsed as an object
// const calculateTime = time => {};
