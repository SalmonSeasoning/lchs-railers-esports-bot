# LCHS Railers eSports Bot
A Discord bot developed using [Discord.js](https://discord.js.org) for the LCHS Railers eSports team!

## Faculty Sponsor
Joe Vazquez. See [http://lchsrailers.org/departments](http://www.lchsrailers.org/departments) for more information.

## Setting Up!
- Get a Discord bot token from [https://discordapp.com/developers/applications](https://discordapp.com/developers/applications)!
- Install Git, Docker, and docker-compose
- Do a `git clone` of this repository like so: `git clone https://github.com/SalmonSeasoning/lchs-railers-esports-bot`, or simply download the target version (if it's available) from [Releases](https://github.com/SalmonSeasoning/lchs-railers-esports-bot/releases) and unzip the file. Treat it the same. Put repository folder in an easily accessible directory like the user Desktop directory.
- A Docker image must now be built. Simply open the repository directory. In there, you can build an image using the following command: `docker-compose build`. This will automatically set up the bot with everything it needs.
- Update the bot token by opening `docker-compose.yml` and changing line 7 after the colon.
- With this, you can now run `docker-compose up` if you are running for testing purposes or `docker-compose up -d` for production purposes. Keep in mind that builds for production will run in the background until something goes horribly wrong, it's manually killed, or the server is restarted, so it must manually be killed if you intend to update or upgrade the Docker instance. The bot, with a little hope, should be online! Also keep in mind that only one instance can run at a time. If an older version is running alongside a newer version, there will be Discord API conflicts and the bot will cease to work.
- To stop the bot, run `docker-compose down`