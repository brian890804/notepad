
module.exports = function (request, response) {
    const headers = request.headers;
    var strHeader = "";
    for (var key in headers) {
        if (strHeader.length > 0) strHeader += ', '
        strHeader += `${key}:${headers[key]}`
    }

    const query = request.query;
    var strQuery = "";
    for (var key in query) {
        if (strQuery.length > 0) strQuery += ', '
        strQuery += `${key}:${query[key]}`
    }

    const body = request.body;
    var strBody = "";
    for (var key in body) {
        if (strBody.length > 0) strBody += ', '
        strBody += `${key}:${body[key]}`
    }
    response.send({
        strHeader: strHeader,
        strQuery: strQuery,
        strBody: strBody
    });
}