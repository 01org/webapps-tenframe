module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-tizen');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadTasks('tools/grunt-tasks');

  grunt.initConfig({
    packageInfo: grunt.file.readJSON('package.json'),
    chromeInfo: grunt.file.readJSON('platforms/chrome-crx/manifest.json'),

    crosswalk: {
      arm: {
        //"outDir": process.env.HOME+'/z/webapps/webapps-annex/build',
        "outDir": 'build',

        verbose: false,

        // display name for the app on the device;
        // the sanitisedName used to construct the Locations object later
        // is derived from this
        name: '<%= packageInfo.name %>',

        // package for the app's generated Java files; this works best if
        // you have at least one period character between two character
        // strings, and no digits
        pkg: 'org.org01.webapps.<%= packageInfo.name.toLowerCase() %>',

        icon: 'icon_128.png',

        fullscreen: true,

        remoteDebugging: true,

        // path to the directory containing your HTML5 app;
        // note that this must use the correct path separators for your
        // platform: Windows uses '\\' while Linux uses '/'
        appRoot: 'build/xpk',

        // relative path from appRoot of the entry HTML file for your app
        appLocalPath: 'index.html',

        // embed crosswalk itself into the package
        //embedded: true,

        // path to the root of your Android SDK installation;
        // on Windows, use the path to the sdk directory inside
        // the installation, e.g. 'c:\\android-sdk\\sdk'
        // default: automatically obtain from the 'android' command's path
        //androidSDKDir: '/opt/android-sdk-linux/',

        // path to the xwalk_app_template directory; you can either
        // download and unpack this manually, or use the xwalk_android_dl
        // script to do so (part of this project; see the README for details);
        // note that path separators specific to your platform must be used
        // eg: export XWALK_APP_TEMPLATE=$HOME/Downloads/crosswalk-3.32.53.4-x86
        //xwalkAndroidDir: project/specific/folder

        // architecture of embedded crosswalk
        // default: it is obtained from the contents of
        // xwalkAndroidDir/native_libs/ if there is only one arch in there,
        // else it should be specified as either 'x86' or 'arm'
        arch: 'arm',

        // default: automatically obtains latest from androidSDKDir/build-tools
        //androidAPIVersion: "18.0.1"
      },
      x86: {
        //"outDir": process.env.HOME+'/z/webapps/webapps-annex/build',
        "outDir": 'build',

        verbose: false,

        // display name for the app on the device;
        // the sanitisedName used to construct the Locations object later
        // is derived from this
        name: '<%= packageInfo.name %>',

        // package for the app's generated Java files; this works best if
        // you have at least one period character between two character
        // strings, and no digits
        pkg: 'org.org01.webapps.<%= packageInfo.name.toLowerCase() %>',

        icon: 'icon_128.png',

        fullscreen: true,

        remoteDebugging: true,

        // path to the directory containing your HTML5 app;
        // note that this must use the correct path separators for your
        // platform: Windows uses '\\' while Linux uses '/'
        appRoot: 'build/xpk',

        // relative path from appRoot of the entry HTML file for your app
        appLocalPath: 'index.html',

        // embed crosswalk itself into the package
        //embedded: true,

        // path to the root of your Android SDK installation;
        // on Windows, use the path to the sdk directory inside
        // the installation, e.g. 'c:\\android-sdk\\sdk'
        // default: automatically obtain from the 'android' command's path
        //androidSDKDir: '/opt/android-sdk-linux/',

        // path to the xwalk_app_template directory; you can either
        // download and unpack this manually, or use the xwalk_android_dl
        // script to do so (part of this project; see the README for details);
        // note that path separators specific to your platform must be used
        // eg: export XWALK_APP_TEMPLATE=$HOME/Downloads/crosswalk-3.32.53.4-x86
        //xwalkAndroidDir: project/specific/folder

        // architecture of embedded crosswalk
        // default: it is obtained from the contents of
        // xwalkAndroidDir/native_libs/ if there is only one arch in there,
        // else it should be specified as either 'x86' or 'arm'
        arch: 'x86',

        // default: automatically obtains latest from androidSDKDir/build-tools
        //androidAPIVersion: "18.0.1"
      }
    },

    clean: ['build'],

    release: {
      options: {
        npm: false,
        npmtag: false,
        tagName: 'v<%= version %>'
      }
    },

    tizen_configuration: {
      // location on the device to install the tizen-app.sh script to
      // (default: '/tmp')
      tizenAppScriptDir: '/home/developer/',

      // path to the config.xml file for the Tizen wgt file - post templating
      // (default: 'config.xml')
      configFile: 'build/wgt/config.xml',

      // path to the sdb command (default: process.env.SDB or 'sdb')
      sdbCmd: 'sdb'
    },

    // this uglifies the main module (and its dependency graph)
    // and copies it to build/app/main.min.js
    requirejs: {
      dist: {
        options: {
          baseUrl: 'app/js',

          // include the main requirejs configuration file;
          // see notes in that file on the allowed format
          mainConfigFile: 'app/js/require-config.js',

          // main application module
          name: 'main',

          // output
          out: 'build/main.min.js',

          // we don't need to wrap the js in an anonymous function,
          // as our main.js runs the application
          wrap: false,

          // remove license comments from js files
          preserveLicenseComments: false,

          uglify: {
            beautify: false,
            toplevel: true,
            ascii_only: true,
            no_mangle: false,
            max_line_length: 1000
          }
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'build/app/lib/require.min.js': [ 'app/lib/requirejs/require.js' ],
          'build/app/js/app.js': [ 'app/js/app.js' ],
          'build/app/js/license.js': [ 'app/js/license.js' ],
          'build/app/js/help.js': [ 'app/js/help.js' ],
          'build/app/js/animation.js': [ 'app/js/animation.js' ],
          'build/app/js/sound.js': [ 'app/js/sound.js' ],
          'build/app/js/pirates.js': [ 'app/js/pirates.js' ],
          'build/app/js/rockets.js': [ 'app/js/rockets.js' ],
          'build/app/js/bowling.js': [ 'app/js/bowling.js' ],
          'build/app/js/scaleBody.js': [ 'app/js/scaleBody.js' ]
        }
      },
      perf: {
        files: {
          'build/save-perf-data.min.js': [
            'tools/save-perf-data.js'
          ]
        }
      }
    },

    // minify and concat CSS
    cssmin: {
      dist: {
        files: {
          'build/app/css/all.css': ['app/css/*.css']
        }
      }
    },

    // copy files required for the wgt package
    copy: {
      common: {
        files: [
          { src: 'build/main.min.js', dest: 'build/app/js/main.min.js' },
          { expand: true, cwd: '.', src: ['app/audio/**'], dest: 'build/' },
          { expand: true, cwd: '.', src: ['app/fonts/**'], dest: 'build/' },
          { expand: true, cwd: '.', src: ['app/README.txt'], dest: 'build/' },
          { expand: true, cwd: '.', src: ['LICENSE'], dest: 'build/app/' }
        ]
      },

      wgt: {
        files: [
          { expand: true, cwd: 'build/app/', src: ['**'], dest: 'build/wgt/' },
          { expand: true, cwd: '.', src: ['icon_128.png'], dest: 'build/wgt/' }
        ]
      },

      wgt_config: {
        files: [
          { expand: true, cwd: 'platforms/tizen-wgt/', src: ['config.xml'], dest: 'build/wgt/' }
        ],
        options:
        {
          processContent: function(content, srcpath)
          {
            return grunt.template.process(content);
          }
        }
      },

      crx: {
        files: [
          { expand: true, cwd: 'build/app/', src: ['**'], dest: 'build/crx/' },
          { expand: true, cwd: '.', src: ['icon*.png'], dest: 'build/crx/' },
          { expand: true, cwd: 'app/_locales/', src: ['**'], dest: 'build/crx/_locales' }
        ]
      },

      crx_unpacked: {
        files: [
          { expand: true, cwd: 'build/app/', src: ['**'], dest: 'build/crx/' },
          { expand: true, cwd: 'app/', src: ['js/**'], dest: 'build/crx/' },
          { expand: true, cwd: 'app/', src: ['css/**'], dest: 'build/crx/' },
          { expand: true, cwd: 'app/', src: ['*.html'], dest: 'build/crx/' },
          { expand: true, cwd: '.', src: ['icon*.png'], dest: 'build/crx/' },
          { expand: true, cwd: 'app/_locales/', src: ['**'], dest: 'build/crx/_locales' },
          {
            src: 'app/lib/requirejs/require.js',
            dest: 'build/crx/lib/requirejs/require.js'
          },
          {
            src: 'app/lib/requirejs-domready/domReady.js',
            dest: 'build/crx/lib/requirejs-domready/domReady.js'
          },
          {
            src: 'app/lib/jquery/jquery.js',
            dest: 'build/crx/lib/jquery/jquery.js'
          }
        ]
      },

      crx_manifest:
      {
        files: [
          { expand: true, cwd: 'platforms/chrome-crx/', src: ['manifest.json'], dest: 'build/crx/' }
        ],

        options:
        {
          processContent: function(content, srcpath)
          {
            return grunt.template.process(content);
          }
        }

      },

      xpk: {
        files: [
          { expand: true, cwd: 'build/app/', src: ['**'], dest: 'build/xpk/' },
          { expand: true, cwd: '.', src: ['icon*.png'], dest: 'build/xpk/' }
        ]
      },

      xpk_manifest:
      {
        files: [
          { expand: true, cwd: 'platforms/tizen-xpk/', src: ['manifest.json'], dest: 'build/xpk/' }
        ],

        options:
        {
          processContent: function(content, srcpath)
          {
            return grunt.template.process(content);
          }
        }

      },

      sdk: {
        files: [
          { expand: true, cwd: 'build/app/', src: ['**'], dest: 'build/sdk/' },
          {
            src: 'app/lib/requirejs/require.js',
            dest: 'build/sdk/lib/requirejs/require.js'
          },
          {
            src: 'app/lib/requirejs-domready/domReady.js',
            dest: 'build/sdk/lib/requirejs-domready/domReady.js'
          },
          {
            src: 'app/lib/jquery/jquery.js',
            dest: 'build/sdk/lib/jquery/jquery.js'
          },
          { expand: true, cwd: 'app/', src: ['js/**'], dest: 'build/sdk/' },
          { expand: true, cwd: 'app/', src: ['css/**'], dest: 'build/sdk/' },
          { expand: true, cwd: 'app/', src: ['*.html'], dest: 'build/sdk/' },
          { expand: true, cwd: '.', src: ['icon*.png'], dest: 'build/sdk/' }
        ]
      },

      sdk_platform:
      {
        files: [
          { expand: true, cwd: 'platforms/tizen-sdk/', src: ['.project'], dest: 'build/sdk/' },
          { expand: true, cwd: 'platforms/tizen-wgt/', src: ['config.xml'], dest: 'build/sdk/' }
        ],

        options:
        {
          processContent: function(content, srcpath)
          {
            return grunt.template.process(content);
          }
        }

      },

    },

    htmlmin: {
      dist: {
        files: [
          { expand: true, cwd: 'app/', src: ['*.html'], dest: 'build/app/' }
        ],
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: false,
          removeCDATASectionsFromCDATA: false,
          removeEmptyAttributes: true,
          removeEmptyElements: false
        }
      }
    },

    // replace stylesheet and js elements
    condense: {
      dist: {
        file: 'build/app/index.html',
        script: {
          src: 'lib/require.min.js',
          attrs: {
            'data-main': 'js/main.min'
          }
        },
        stylesheet: 'css/all.css'
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [
          { expand: true, cwd: '.', src: ['app/images/**'], dest: 'build/' },
          { expand: true, cwd: '.', src: ['app/css/images/**'], dest: 'build/' }
        ]
      }
    },

    // make wgt package in build/ directory
    package: {
      wgt: {
        appName: '<%= packageInfo.name %>',
        version: '<%= packageInfo.version %>',
        files: 'build/wgt/**',
        stripPrefix: 'build/wgt/',
        outDir: 'build',
        suffix: '.wgt',
        addGitCommitId: false
      },
      sdk: {
        appName: '<%= packageInfo.name %>',
        version: '<%= packageInfo.version %>',
        files: 'build/sdk/**',
        stripPrefix: 'build/sdk/',
        outDir: 'build',
        suffix: '.zip'
      },
      'crx_zip': {
        appName: '<%= packageInfo.name %>-crx',
        version: '<%= packageInfo.version %>',
        files: 'build/crx/**',
        stripPrefix: 'build/crx/',
        outDir: 'build',
        suffix: '.zip'
      }
    },

    tizen: {
      push: {
        action: 'push',
        localFiles: {
          pattern: 'build/*.wgt',
          filter: 'latest'
        },
        remoteDir: '/home/developer/'
      },

      install: {
        action: 'install',
        remoteFiles: {
          pattern: '/home/developer/<%= packageInfo.name %>*.wgt',
          filter: 'latest'
        }
      },

      uninstall: {
        action: 'uninstall'
      },

      start: {
        action: 'start',
        stopOnFailure: true
      },

      stop: {
        action: 'stop',
        stopOnFailure: false
      },

      pushdumpscript: {
        action: 'push',
        localFiles: 'tools/dump-localStorage.sh',
        remoteDestDir: '/home/developer/',
        chmod: '+x',
        overwrite: true
      },

      dumplocalstorage: {
        action: 'script',
        remoteScript: '/home/developer/dump-localStorage.sh'
      }
    },

    inline: {
      script: 'build/save-perf-data.min.js',
      htmlFile: 'build/app/index.html'
    },

    simple_server: {
      port: 30303,
      dir: 'build/app/'
    }
  });

  grunt.registerTask('dist', [
    'clean',
    'imagemin:dist',
    'requirejs:dist',
    'uglify:dist',
    'cssmin:dist',
    'htmlmin:dist',
    'copy:common',
    'condense'
  ]);

  grunt.registerTask('crx', ['dist', 'copy:crx', 'copy:crx_manifest']);
  grunt.registerTask('crx_unpacked', [
    'clean',
    'imagemin:dist',
    'copy:common',
    'copy:crx_unpacked',
    'copy:crx_manifest',
    'package:crx_zip'
  ]);
  grunt.registerTask('wgt', ['dist', 'copy:wgt', 'copy:wgt_config', 'package:wgt']);
  grunt.registerTask('xpk', ['dist', 'copy:xpk', 'copy:xpk_manifest']);
  grunt.registerTask('sdk', [
    'clean',
    'imagemin:dist',
    'copy:common',
    'copy:sdk',
    'copy:sdk_platform',
    'package:sdk'
  ]);

  grunt.registerTask('perf', [
    'dist',
    'uglify:perf',
    'inline',
    'copy:wgt',
    'copy:wgt_config',
    'package:wgt'
  ]);

  grunt.registerTask('install', [
    'tizen:push',
    'tizen:stop',
    'tizen:uninstall',
    'tizen:install',
    'tizen:start'
  ]);

  grunt.registerTask('wait', function () {
    var done = this.async();
    setTimeout(function () {
      done();
    }, 10000);
  });

  grunt.registerTask('perf-test', function () {
    var tasks = ['tizen:pushdumpscript', 'perf', 'install', 'tizen:stop'];

    for (var i = 0; i < 11; i++) {
      tasks.push('tizen:start', 'wait', 'tizen:stop');
    }

    tasks.push('tizen:dumplocalstorage')

    grunt.task.run(tasks);
  });

  grunt.registerTask('restart', ['tizen:stop', 'tizen:start']);

  grunt.registerTask('server', ['dist', 'simple_server']);

  grunt.registerTask('wgt-install', ['wgt', 'install']);
  grunt.registerTask('sdk-install', ['sdk', 'install']);

  grunt.registerTask('default', 'wgt');
  grunt.registerTask('apk', [
    'xpk',
    'crosswalk:x86',
    'crosswalk:arm'
  ]);
};
