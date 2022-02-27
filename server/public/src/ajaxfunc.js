
/**
 * Use this function to send numbers as well.
 * @param {string} url URL to send
 * @param {string} type Sending type (GET, POST)
 * @param {string} varName Variable name from which you will access data from the server
 * @param {*} text Data to send
 */
function sendText(url, type, varName, text) {
    $.ajax({
        url: url,
        type: type,
        data: varName + "=" + text,
        dataType: "text"
    })
}

/**
 * Use this function to send json.
 * This function can only be used in POST events.
 * @param {string} url URL to send
 * @param {*} json Data to send
 */
 function sendJson(url, json) {
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    })
}