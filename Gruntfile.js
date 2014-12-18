'use strict';

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var components = [
  //TODO pull from single source (like _config.yml)
  'components/jquery/dist/jquery.js',
  'components/lightbox/js/lightbox.js'
];

module.exports = function(grunt) {

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
  });



  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-divshot');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('devbuild', ['concat:dev','jekyll:dev']);
  grunt.registerTask('build', ['jshint', 'uglify:dist', 'jekyll:dist']);

  grunt.registerTask('devdeploy', ['devbuild', 'divshot:push:development']);
  grunt.registerTask('deploy', ['build', 'divshot:push:production']);

  grunt.registerTask('default', ['testbuild']); //then compass with watch and autobuild

  //todo tasks for new posts

};