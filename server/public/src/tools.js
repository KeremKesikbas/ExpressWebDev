/**
 * Use this function to send json.
 * This function can only be used in POST events.
 * @param {string} url URL to send
 * @param {*} json Data to send
 */
function sendJSON(url, json) {
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    })
}

/**
 * @param {string} url
 */
function changeURL(url) {
    old_url = new URL(window.location.href);
    window.location.href = url + old_url.search;
}