// Usage: Pass the message object, pass the currentLevel, function
// will return the amount of XP to give the user. Check should be
// LevelUp(message, 438) > 0
// before assigning the new level
function CalcNewLevel(message, currentLevel)
{
  let attachment = message.attachments.array()[0];
  let xp = currentLevel;
  if(!attachment)
  {
  // just a normal message
    if(message.content.length > 1500)
    {
        xp += 2;
        return xp; // definitely spam
    }
    else if (message.content.length > 1000)
    {
        xp += 3;
        return xp;
    }
    if(message.content.length > 500)
    {
        xp += 5;
        return xp; // this is ideal since spam and lots of text gets annoying
    }
    if(message.content.length > 50)
    {
        xp += 3;
        return xp; // more than 50 characters, probably an actual message lol
    }
    if(message.content.length <= 50)
    {
      return xp;
    }
  }else
  {
    xp += 2; // for the attachment
    if(message.content.length > 1500)
    {
        xp += 2;
        return xp; // definitely spam
    }
    else if (message.content.length > 1000)
    {
        xp += 3;
        return xp;
    }
    if(message.content.length > 500)
    {
        xp += 5;
        return xp; // this is ideal since spam and lots of text gets annoying
    }
    if(message.content.length > 50)
    {
        xp += 3;
        return xp; // more than 50 characters, probably an actual message lol
    }
    if(message.content.length <= 50)
    {
      return xp;
    }
  }
}

function LevelUp(message, db, dbConnection)
{
  let uid = message.author.id;
  // get level from database
  var xp = 5; // JUST TESTING
  
  var new_xp = CalcNewLevel(message, xp);

  // set level in database

  return new_xp;

}

module.exports = {
    LevelUp : LevelUp,
    CalcNewLevel: CalcNewLevel
}
