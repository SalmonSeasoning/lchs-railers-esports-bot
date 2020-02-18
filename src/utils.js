function textIsValid(text) {
    if (text != undefined)
        if (text != NaN)
            if (text != null)
                if (text.length > 0)
                    return true;
    return false;
}
// easier than var = var ? var : default;
// ex. var = TernaryIf(var, default);
function ternaryIf(cond, def)
{
    if(cond) return cond;
    return def;
}
// for some reason ./ will refer to the project dir and not
// -the current working directory.
function readIfExistsSync(fileName)
{
    if(require("fs").existsSync(fileName))
        return require("fs").readFileSync(fileName, "UTF-8");
}
module.exports = {
    textIsValid : textIsValid,
    ternaryIf: ternaryIf,
    readIfExistsSync: readIfExistsSync
}
