const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { getDebugMessage, styleString } = require('./utils');
const { generateVastXml } = require('./vast.xml.js');

function startServer(config) {
  const baseUrl = `http://${config.HOST}:${config.PORT}`;

  const routes = {
    'favicon.ico': handleFavicon,
    'vast.xml': handleVastXml,
    public: handleStaticFile,
    default: handleDefault,
  };

  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname.slice(1);
    const queryParams = parsedUrl.query;

    const route = pathname.startsWith('public/')
      ? 'public'
      : routes[pathname]
        ? pathname
        : 'default';

    routes[route](req, res, { config, baseUrl, pathname, queryParams });
  });

  server.listen(config.PORT, config.HOST, () => {
    console.log(
      styleString(`✅ Listening debug requests at ${baseUrl}/`, 'cyan', true),
    );
    console.log(
      styleString(`✅ VAST XML available at ${baseUrl}/vast.xml`, 'cyan'),
    );
    console.log(
      styleString(
        '-------------------------------------------------------\n',
        'white',
        true,
      ),
    );
  });

  function handleFavicon(req, res) {
    res.writeHead(204);
    res.end();
  }

  function handleVastXml(req, res, { config, baseUrl, queryParams }) {
    const requestOrigin = req.headers.origin || '*';
    const requestUrl = `${baseUrl}${req.url}`;

    res.writeHead(200, {
      'Content-Type': 'application/xml; charset=utf-8',
      'Access-Control-Allow-Origin': requestOrigin,
      'Access-Control-Allow-Credentials': 'true',
      Vary: 'Origin',
    });
    res.end(generateVastXml(config, queryParams));
    console.log(
      styleString(
        `VAST XML requested from origin: ${requestOrigin} into ${requestUrl}`,
        'blue',
      ),
    );
  }

  function handleStaticFile(req, res, { pathname }) {
    const filePath = path.join(__dirname, '..', pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }
      const ext = path.extname(filePath);
      const contentType =
        {
          '.mp4': 'video/mp4',
          '.jpg': 'image/jpeg',
          '.png': 'image/png',
        }[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      console.log(styleString(`Static file served: ${pathname}\n`, 'blue'));
    });
  }

  function handleDefault(req, res, { config, pathname, queryParams }) {
    if (pathname) {
      const eventInfo = {
        name: pathname,
        params: queryParams,
      };
      console.log(getDebugMessage(eventInfo, config.SHOW_TIMESTAMP));
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  }
}

module.exports = { startServer };
