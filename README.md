# cron
simple node.js application to return next scheduled time of a series of cron jobs. The program will take a config file in the following format:

30 1 /bin/run_me_daily
45 * /bin/run_me_hourly
* * /bin/run_me_every_minute
* 19 /bin/run_me_sixty_times

and on specifying the current time as an input, will output the series of cron jobs in the config file in the following format:

1:30 tomorrow - /bin/run_me_daily
16:45 today - /bin/run_me_hourly
16:10 today - /bin/run_me_every_minute
19:00 today - /bin/run_me_sixty_times

To allow the porgram to run within command line, within the directory of where the cron.js file is located, please run the following command:

chmod u+x cron.js

After that you will be able to run the command as follows:

./cron.js HH:MM < config

where HH:MM is the current time in 24h format ( e.g 17:30).

