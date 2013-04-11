# INITIAL SET UP

To run the build, you'll need to install some node modules.
Run the following in the top-level directory of the project:

  npm install

Rather annoyingly, grunt now requires that you install
grunt-cli globally to be able to use grunt from the
command line. Note that the build will still use the
version of grunt associated with this application
(in node_modules/).

To install grunt-cli do:

  npm install -g grunt-cli

You also need bower to install the client-side dependencies:

  npm install -g bower

You should then install the client-side dependencies into lib/:

  bower install

# WHERE'S THE APP?

Open index.html in a browser (providing you have installed the
client-side dependencies using bower: see above).

Or you could also serve the app from a standard web server by running

  grunt dist

then copying the content of the build/app/ directory to a web folder.

Alternatively, run:

  grunt server

to build the deployment version of the app and run it on a server,
accessible via http://localhost:30303/. This is useful for testing the
app in a mobile device's browser.

Or you can install to an attached Tizen device via sdb by running:

  grunt install

then

  grunt reinstall

to reinstall the package after you've been working on the code.

Or you can build the files required for a crx deployment with:

  grunt crx

(NB you will have to load this as an unpacked extension in Chrome
developer mode, as the grunt build doesn't make .crx files.)

# PACKAGING

The application can be packaged into a wgt (zip) file using the grunt
command:

  ./grunt wgt

This will generate a package in the build/ directory.

# CACHING AND HOW TO BYPASS IT

To use the app in no-cache mode (so the browser doesn't cache
any JS files), open:

  index.html?nocache

This stops requirejs using cached copies of js files so you get
the most recent js each time you refresh the browser.

To use in normal (caching) mode, open:

  index.html

NB no-cache mode cannot be used if the app is running from a build
(i.e. code generated and put into build/dist/, which is what the
simple_server task serves).

The code which looks for this URL argument is in the require configuration
file, app/js/require-config.js.

# ADDING YOUR OWN AMD MODULES

When using require in your own code, paths to modules should be
relative to the ./js/ directory. So, for example, imagine you're
defining a new module js/newmodule.js, which depends on
the module in js/mymodule.js. To load the dependency in
js/newmodule.js, you'd do this:

  // NB 'mymodule' is the path to mymodule.js, relative to js
  define(['mymodule'], function (MyModule) {
    var newmodule = {
      /*
         DEFINE NewModule HERE;
         in your definition of newmodule, you can make use
         of the MyModule dependency
      */
    };

    return NewModule;
  });

# ADDING THIRD PARTY LIBRARIES

Install the dependency (if possible) using bower:

  bower install ...package... --save

This will put the package into lib/ and save the dependency into
the component.json file.

You will then need to add a path and/or shim for the library into
js/require-config.js so it can be referenced by other modules.
