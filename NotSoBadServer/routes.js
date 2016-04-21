"use strict";


function handle_root(req) {
    const headers = {
        'Set-Cookie': 'mycookie=test',
    };

    const ip = req.connection.remoteAddress;
    return {
        headers: headers,
        body: `<h1>Welcome</h1>Your IP: ${ip}<pre>${JSON.stringify(req.cookies)}</pre>`,
    };
}


module.exports = {
    '/': {'GET': handle_root}, 
};
