// These are important and needed before anything else

import  'zone.js/dist/zone-node';
import  'reflect-metadata';

import { enableProdMode } from  '@angular/core';
import  *  as  express  from  'express';
import { join } from  'path';
  
// NOTE: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } =  require('./main.bundle');

// NgUniversalTools: Express Engine and moduleMap for lazy loading
import { ngExpressEngine } from  '@nguniversal/express-engine';
import { provideModuleMap } from  '@nguniversal/module-map-ngfactory-loader';


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const  app  =  express();
const  PORT  =  process.env.PORT  ||  4000;
const  DIST_FOLDER  =  join(process.cwd(), 'dist');

app.engine('html', ngExpressEngine({
bootstrap:  AppServerModuleNgFactory,
providers: [
    provideModuleMap(LAZY_MODULE_MAP)
]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

/* TODO: implement data requests securely
// app.get('/api/*', (req, res) => {
// res.status(404).send('data requests are not supported');
// });
*/

// Server static files from browser
app.get('*.*', express.static(DIST_FOLDER));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
res.render(join(DIST_FOLDER, 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
console.log(`Node server listening on http://localhost:${PORT}`);
});