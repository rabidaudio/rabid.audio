'use strict';

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
    cfg: grunt.file.readYAML('_config.yml'),

    jekyll: {
      options: {
        bundleExec: false,
        src : '.'
      },
      //Production Build
      dist: {
        options: {
          config: '_config.yml'
        }
      },
      //Test Build
      dev: {
        options: {
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
      //don't use, connect is better (has watch, etc)
      server: {options: {}},
    },
    //the real meat
    'divshot:push':{
      //options from divshot.json
      development: {},
      production: {}
    },


    //js compilation (prodcution version)
    uglify: {
      dist: {
        files: {
          'js/output.js': ['<%= cfg.vendor %>', '_src/**/*.js']
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
        src: ['<%= cfg.vendor %>', '_src/**/*.js'],
        dest: 'js/output.js',
      },
    },

    watch: {
      options:{
        spawn: false,
        livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
      },
      scripts: {
        files: ['_src/**/*.js', '_vendor/**/*.js'],
        tasks: ['devbuild'],
      },
      content: {
        files: ['*.*','_sass/*css','css/*css', '_drafts/*','_posts/*','_layouts/*', '_includes/*', 'images/*', '_plugins/*', '_config.yml'],
        tasks: ['jekyll:dev'],
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

    //auto open site on grunt execute
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