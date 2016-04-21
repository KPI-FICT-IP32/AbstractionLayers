"use strict";


// Imports
const http = require('http');
const routes = require('./routes');
const utils = require('./utils');


function parseCookie(cookie) {
    let cookies = {};
    if (cookie) {
        cookie.split(';').forEach((item) => {
            const parts = item.split('=');
            cookies[(parts[0]).trim()] = (parts[1] || '').trim();
        });
    }
    return cookies;
}


function prepareHeaders(headers) {
    let result = utils.deepcopy(headers);
    if (!result['Content-Type']) {
        result['Content-Type'] = 'text/html';
    }
    return result;
}


// Server
http.createServer((req, resp) => {
    try {
        const endpoint = routes[req.url];
        req.cookies = parseCookie(req.headers.cookie);

        if (!endpoint) {
            resp.writeHead(404, {'Content-Type': 'text/html'});
            resp.end('<img src="http://http.cat/404"></img>');
        }

        const handler = endpoint[req.method];
        if (!handler) {
            resp.writeHead(405, {'Content-Type': 'text/html'});
            resp.end('<img src="http://http.cat/405"></img>');
        }

        const result = handler(req);
        const headers = prepareHeaders(result.headers);
        const body = result.body;

        resp.writeHead(200, headers);
        resp.end(body);

    } catch (code) {
        console.log(req.url, code.stack);
        if (typeof(code) !== 'number') code = 500;
        resp.writeHead(code, {'Content-Type': 'text/html'});
        resp.end(`<img src="http://http.cat/${code}"></img>`);
    }
}).listen(8080);
