import express    from 'express';
import React      from 'react';
import { Router } from 'react-router';
import Location   from 'react-router/lib/Location';
import routes     from 'routes';

const app = express();

app.use((req, res) => {

  const location = new Location(req.path, req.query);

  Router.run(routes, location, (err, routeState) => {

    if (err) return console.error(err);
    if (!routeState) return res.status(404).end('404');

    const InitialComponent = (
      <Router {...routeState} />
    );

    const componentHTML = React.renderToString(InitialComponent);
    const HTML = `<div id="react-view">${componentHTML}</div>
`;
    res.end(HTML);
  });
});
export default app;
