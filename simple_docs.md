# Command (Class)
## command.js
```js
var command = new Command( CommandName, CommandFunc, RequiresElevation, IsActiveCommand);
```
`CommandName` - The name of the command. I.E. "banana" will be set to run when the user types "!banana".

`CommandFunc` - Generally an arrow function passed, accepts `client`, `message`, `args`, and `dbConnection`.

`client` is the Discord Client object and `message` is the passed Discord Message object from Discord.js.

`args` is `message.cleanContent` split by spaces, excluding the command (i.e. `["stuff", "yeet"]`, does not include `"!command"`)

`RequiresElevation` is a simple boolean (default: `false`) that just states whether or not the user should be a bot administrator,
configurable in database.

`IsActiveCommand` is a simple boolean (default: `true`) that states whether or not the command should be able to be used at all.
This includes by bot administrators.

Commands go in the "commands" directory and will be auto-included on execution. It is suggested the basic set up for a new command
looks like this:
```js
const Command = require('../command.js'),
    new_command = new Command("bike", (client, message, args, dbConnection) => {
      // Your code goes here!
    });

module.exports = new_command;
```

# TextIsValid (Function)
## utilities.js
```js
const utilities = require('./utilities.js');
utilities.TextIsValid( YourString );
```
`YourString` - Just a String.

Does various checks to make sure everything is ok with the String. Basically just makes sure it exists and nothing is wrong with it.

# Database functions need to be documented by iComputer7 still...
