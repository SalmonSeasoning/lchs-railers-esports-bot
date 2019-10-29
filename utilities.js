function TextIsValid(text) {
    if (text != undefined)
        if (text != NaN)
            if (text != null)
                if (text.length > 0)
                    return true;
    return false;
}

module.exports = {
    TextIsValid : TextIsValid
}