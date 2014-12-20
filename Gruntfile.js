'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT     = 9000;

var fs   = require('fs');
var path = require('path');

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
      dist: {},
      dev: { options: { drafts: true } }
    },

    jshint: {
      src: ['_src/**/*.js']
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


    //js compilation (production version)
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
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */',
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
        files: [
          '*.*',
          '_sass/*css',
          'css/*css',
           '_drafts/*',
           '_posts/*',
          '_layouts/*',
           '_includes/*',
           'images/*',
           '_plugins/*',
           '_config.yml'
         ],
        tasks: ['jekyll:dev'],
      },
    },

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
      local: {
        path: 'http://localhost:<%= connect.options.port %>/blog'
      },
      dev: {
        path: 'http://development.rabidaudio-blog-2.divshot.io/blog'
      },
      prod: {
        path: 'http://rabid.audio/blog'
      }
    },

    editor: {
      options: {
        editor: '<%= pkg.editor || process.env.VISUAL || process.env.EDITOR %>'
      },
      src: []
    },


    copy: {
      //https://github.com/sass/sass/issues/556#issuecomment-39467721
      cssAsScss: {
        files: [
          {
            expand: true,
            src: ['_vendor/**/*.css', '!_vendor/**/*.min.css'],
            dest: '_sass',
            filter: 'isFile',
            ext: ".scss"
          }
        ]
      }
    }
  });

  grunt.registerTask('devbuild', ['concat:dev', 'jekyll:dev']);
  grunt.registerTask('build', ['jshint', 'uglify:dist', 'jekyll:dist']);

  grunt.registerTask('devdeploy', ['devbuild', 'divshot:push:development', 'open:dev']);
  grunt.registerTask('deploy', ['build', 'divshot:push:production', 'open:prod']);

  grunt.registerTask('serve', ['devbuild', 'connect:livereload', 'open:local', 'watch']);
  grunt.registerTask('default', ['serve']);



  //tasks for new posts
  grunt.registerTask('new', 'Start a new post or draft', function(type) {
    var done = this.async();
    var dir = "_drafts";
    if(type==="post"){
      dir = "_posts";
    }

    var d = new Date();

    require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    }).question("Title of the post: ", function(title){
      if(!title) return grunt.fail.warn("No title specified");

      grunt.log.writeln('Creating...');

      var file_title = title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g,'-');
      var file_name = [d.getFullYear(), d.getMonth()+1, d.getDate()].join("-")+"-"+file_title+".md";
      var full_name = path.resolve(dir, file_name);

      //todo insert title
      fs.createReadStream("_templates/post.md").pipe(fs.createWriteStream(full_name)); //copy template

      grunt.config('editor.src', [full_name]);
      grunt.task.run('editor');
      done();
    });
  });

};