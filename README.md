# diabetes-self-management-app

<b>Diabetes-Self-Management-App</b><br>
Focus on using development tools to split the code into multiple files, both on the server and the client side.<br>

Server-Side Modules<br>
Separate activity.js and use module.export to export for server.js to use<br>

Introduction to Webpack<br>
For automatic dependency management, use webpack to define dependencies. Compared to browserify, webpack is simpler to separating bundles for third-party libraries and my own modules. It has a single pipeline to transform, bundle, and watch for changes and generate new bundles as fast as possible.<br>

Using Webpack Manually<br>
Install webpack module with npm and run webpack. Webpack cannot handle JSX natively so it is first run against App.js instead of App.jsx. <br>Use ES2015 export default and import to separate ActivityAdd.jsx. This was not doable in the server-side because Node.js does not support this style natively. Use default keyword if exporting a single class, and you want it to be the result of an import statement directly (or a top-level export).<br>Once compiling, running webpack will have it look at the import statements within each of the js files and figure out the dependency tree.<br>

Transform and Bundle<br>
Instead of manually transforming JSX files and using webpack to bundle them together, webpack and its helper, babel-loader, can combine these two steps. (install babel-loader module).<br>
Rather than using loaders in the command line, you can use a configuration file to give these parameters to webpack. (webpack.config.js) Webpack loads this configuration file as a module and gets its parameters from this module. Everything has to be under one exported object. Inside the exported object, webpack looks for various properties, and entry, output, module props are used. Running webpack now allows bundle, transform, and watch automatically. All class components are separted.<br>

Libraries Bundle<br>
Now using webpack to create a bundle that includes the libraries for the client-side.
react, react-dom, whatwg-fetch, and babel-polyfill installed with npm. fetch is imported into the global namespace because it is expected to be a substitute for window.fetch(), which should be available in the browser in any case. Bundle becomes quite large to run webpack on every change so it is separated into two bundles, one for the application code and another for all the libraries using CommonsChunkPlugin.

