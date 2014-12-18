'use strict';

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var components = [
  //TODO pull from single source (like _config.yml)
  'components/jquery/dist/jquery.js',
  'components/lightbox/js/lightbox.js'
];

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  require('time-grunt')(grunt);       //time execution
  require('load-grunt-tasks')(grunt); //load all required packages

  grunt.initConfig({

    //config files
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readYAML('_config.yml'),

    jekyll: {
      options: {
        bundleExec: false,
        src : '.'
      },
      //Production Build
      dist: {
        options: {
          // dest: '_site/blog',
          config: '_config.yml'
        }
      },
      //Test Build
      dev: {
        options: {
          // dest: '_site/blog',
          config: '_config.yml',
          drafts: true
        }
      }
    },

    //linting
    jshint: {
      all: ['_src/**/*.js']
    },

    divshot: {
      //no-op, compass is better
      server: {options: {}},
    },
    //the real meat
    'divshot:push':{
      //options from divshot.json
      development: {},
      production: {}
    },


    //js compilation
    uglify: {
      dist: {
        files: {
          'js/output.js': [components, '_src/**/*.js']
        },
        options: {
          compress: true,
        }
      }
    },

    //js compilation (dev version)
    concat: {
      options: {
        separator: '\n\n\n',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dev: {
        src: [components, '_src/**/*.js'],
        dest: 'js/output.js',
      },
    },

    watch: {
      options:{
        spawn: false,
        livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
      },
      scripts: {
        files: ['_src/**/*.js', 'components/**/*.js'],
        tasks: ['devbuild'],
        // options: { livereload: true }
      },
      content: {
        files: ['*.md','_sass/*css','css/*css', '_drafts','_posts','_layouts', '_includes', 'images', '_plugins', '_config.yml'],
        tasks: ['jekyll:dev'],
        options: { livereload: true }
      },
    },

    //serve it up
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')({port: LIVERELOAD_PORT}),
              mountFolder(connect, '_site')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/blog'
      }
    },
  });

  grunt.registerTask('devbuild', ['concat:dev','jekyll:dev']);
  grunt.registerTask('build', ['jshint', 'uglify:dist', 'jekyll:dist']);

  grunt.registerTask('devdeploy', ['devbuild', 'divshot:push:development']);
  grunt.registerTask('deploy', ['build', 'divshot:push:production']);

  grunt.registerTask('serve', ['devbuild', 'connect:livereload', 'open:server', 'watch']);
  grunt.registerTask('default', ['serve']);

  //todo tasks for new posts

};