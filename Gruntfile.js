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
    div: grunt.file.readJSON('divshot.json'),
    bow: grunt.file.readJSON('.bowerrc'),

    jekyll: {
      dist: {},
      dev: { options: { drafts: true } }
    },

    jshint: {
      src: ['<%= cfg.directories.sourcejs %>/**/*.js']
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
          '<%= cfg.jsurl %>': ['<%= cfg.vendor.js %>', '<%= cfg.directories.sourcejs %>/**/*.js']
        },
        options: {
          compress: {},
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
        src: ['<%= cfg.vendor.js %>', '<%= cfg.directories.sourcejs %>/**/*.js'],
        dest: '<%= cfg.jsurl %>',
      },
    },

    watch: {
      options:{
        spawn: false,
        livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
      },
      scripts: {
        files: ['<%= cfg.directories.sourcejs %>/**/*.js', '<%= bow.directory %>**/*.js'],
        tasks: ['devbuild'],
      },
      content: {
        files: [
          '<%= cfg.directories.sass %>/**/*css',
          '<%= cfg.directories.css %>/*css',
           '<%= cfg.directories.drafts %>/**/*',
           '<%= cfg.directories.posts %>/**/*',
          '<%= cfg.directories.layouts %>/**/*',
           '<%= cfg.directories.includes %>/**/*',
           '<%= cfg.directories.assets %>/**/*',
           '!<%= cfg.directories.sourcejs %>/**/*.js',
           '!<%= cfg.jsurl %>',
           '<%= cfg.directories.plugins %>/**/*',
           '*.md',
           '*.html'
         ],
        tasks: ['devbuild'],
      },
      configFiles: {
        files: [ 'Gruntfile.js', '*.yml', '*.json' ],
        options: {
          reload: true
        },
        tasks: ['devbuild']
      }
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
        path: 'http://localhost:<%= connect.options.port %><%= cfg.baseurl %>'
      },
      dev: {
        path: 'http://development.<%= div.name %>.divshot.io<%= cfg.baseurl %>'
      },
      prod: {
        path: '<%= cfg.url %><%= cfg.baseurl %>'
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
            src: ['<%= bow.directory %>/**/*.css', '!<%= bow.directory %>/**/*.min.css'],
            dest: '<%= cfg.directories.sass %>',
            filter: 'isFile',
            ext: ".scss"
          }
        ]
      },
      fonts: {
        expand: true,
        cwd: '<%= bow.directory %>',
        src: ['<%= cfg.vendor.fonts %>/*'],
        dest: '<%= cfg.directories.fonts %>'
      },
      newPost: {
        src: ['<%= cfg.directories.templates%>/post.md'],
      }
    }
  });

  grunt.registerTask('devbuild', ['concat:dev', 'jekyll:dev']);
  grunt.registerTask('build', ['jshint', 'uglify:dist', 'jekyll:dist']);

  grunt.registerTask('devdeploy', ['devbuild', 'divshot:push:development']);
  grunt.registerTask('deploy', ['build', 'divshot:push:production']);
  grunt.registerTask('depall', ['devdeploy', 'deploy']);

  grunt.registerTask('serve', ['devbuild', 'connect:livereload', 'watch']);
  grunt.registerTask('default', ['serve', 'open:local']);



  //tasks for new posts
  grunt.registerTask('new', 'Start a new post or draft', function(type) {
    var done = this.async();
    var dir = "<%= cfg.directories.drafts %>";
    if(type==="post"){
      dir = "<%= cfg.directories.posts %>";
    }

    var d = new Date();
    var tz = -1*(Math.floor( d.getTimezoneOffset() / 60)*100 + (d.getTimezoneOffset() % 60));
    if(tz>=0){
      tz = '+'+(tz.toString().length < 3 ? "0" : "")+tz;
    }else{
      tz = '-'+(tz.toString().length < 3 ? "0" : "")+Math.abs(tz);
    }
    var df = [ d.getFullYear(),
               d.getMonth()+1,
               d.getDate(),].join('-')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':') +' '+tz;
    var rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Category (other): ", function(category){
      if(!category) category = "other";
      rl.question("Title of the post: ", function(title){
        if(!title) return grunt.fail.warn("No title specified");

        grunt.log.writeln('Creating...');

        var file_title = title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g,'-');
        var file_name = [d.getFullYear(), d.getMonth()+1, d.getDate()].join("-")+"-"+file_title+".md";
        var full_name = path.resolve(dir, file_name);

        //todo insert title -see grunt copy
        // fs.createReadStream("<%= cfg.directories.templates %>/post.md").pipe(fs.createWriteStream(full_name)); //copy template
        grunt.config('copy.newPost.dest', full_name);
        grunt.config('copy.newPost.options.process', function (content, srcpath) {
          return content.replace(/%TITLE%/g, title).replace(/%DATE%/g, df).replace(/%CATEGORY%/g, category);
        });
        grunt.task.run('copy:newPost');

        grunt.config('editor.src', [full_name]);
        grunt.task.run('editor');
        done();
      });
    });
  });

};