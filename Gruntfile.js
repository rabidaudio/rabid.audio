'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT     = 9000;

var fs       = require('fs');
var path     = require('path');
var async    = require('async');
var inquirer = require("inquirer");
var chalk    = require('chalk');

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  require('time-grunt')(grunt);       //time execution
  require('load-grunt-tasks')(grunt); //load all required packages
  var _ = grunt.util._;

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
    },

    handlebars_to_static: {
      post_template: {
        src: ['<%= cfg.directories.templates%>/post.md'],
        dest: ''
      }
    },
  });

  grunt.registerTask('devbuild', ['concat:dev', 'jekyll:dev']);
  grunt.registerTask('build', ['jshint', 'uglify:dist', 'jekyll:dist']);

  grunt.registerTask('devdeploy', ['devbuild', 'divshot:push:development']);
  grunt.registerTask('deploy', ['build', 'divshot:push:production']);
  grunt.registerTask('depall', ['devdeploy', 'deploy']);

  grunt.registerTask('serve', ['devbuild', 'connect:livereload', 'watch']);
  grunt.registerTask('default', ['serve', 'open:local']);

  //tasks for new posts
  grunt.registerTask('new', 'Start a new post or draft', function(layout) {

    var this_task   = this; //grunt.task.current;
    var done        = this_task.async();
    var type        = layout || "draft"; //this_task.args[0] || "draft";
    var now         = new Date();
    var date_string = dateString(now);
    var cfg         = grunt.config.data.cfg;

    var isPost    = function(info){ return (info.layout === "post"); }
    var isNotPost = function(info){ return !isPost(info);            }

    inquirer.prompt([
      {
        type:     "list",
        name:     "layout",
        message:  "Layout",
        default:  layout || "post",
        choices:  function(){
          return _.map(fs.readdirSync(cfg.directories.layouts), function(layout){
            return path.basename(layout, '.html'); //strip '.html'
          });
        }
      },
      {
        name:     "title",
        message:  "Title",
        validate: function(input){
          if(  input === ""   ) { return "No title specified"; }
          if(input.length > 33) { return "Title too long";     }
          return true;
        }
      },
      {
        name:     "subtitle",
        message:  "Subtitle",
        when:     isPost
      },
      {
        name:     "permalink",
        message:  "Permalink",
        when:     isNotPost,
        default:  function(answers){ return "/"+require('slugify')(answers.title.toLowerCase())+"/"; }
      },
      {
        name:     "date",
        message:  "Date",
        when:     isPost,
        default:  date_string,
      },
      {
        type:     "list",
        name:     "category",
        message:  "Select a category",
        when:     isPost,
        choices:  function(){ return _.chain(cfg.colormap).keys().unshift("other").value(); }
      },
      {
        type:     "checkbox",
        name:     "tags",
        message:  "Select tags",
        when:     isPost,
        filter:   function(result){ return _.map(result, chalk.stripColor); }, //remove color from returned values
        choices:  function(answers){
          //complicated underscore to get a list of all tags with the tags of this category first, correctly colored if possible
          return _.chain(cfg.tagmap)
            .map(function(tags, category){
              var color = cfg.colormap[category];
              return _.map(tags, function(tag){
                if(chalk[color] !== undefined && chalk.supportsColor){ tag = chalk[color](tag); } //colorize
                return [category, tag];
              });
            })                                                                    //an array of arrays of pairs like [category, value]
            .flatten("shallow")                                                   //an array of pairs like [category, value]
            .sortBy(function(pairs){ return !(pairs[0] === answers.category); })  //an array of pairs sorted by category
            .map(function(pairs){ return pairs[1]; }) //grab tag
            .value(); //an array of tags
        }
      },
      {
        type:     "confirm",
        name:     "draft",
        message:  "Store as draft", //todo: promote to post task
        default:  true,
        when:     isPost
      },
      {
        type:     "confirm",
        name:     "published",
        message:  "Mark as published",
        default:  false,
      },
      {
        type:     "confirm",
        name:     "mathjax",
        message:  "Include Mathjax",
        default:  false
      },
    ], function(answers) {

        var dir        = (answers.draft ? cfg.directories.drafts : cfg.directories.posts);
        var file_title = answers.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g,'-');
        var file_name  = [now.getFullYear(), now.getMonth()+1, now.getDate()].join("-")+"-"+file_title+".md";
        var full_name  = path.resolve(dir, file_name);

        grunt.config('handlebars_to_static.post_template.options.file_context',function(){return {
          dest: full_name,
          data: answers
        };});
        // grunt.config('handlebars_to_static.post_template.dest', full_name);
        console.log(grunt.config.data.handlebars_to_static);
        grunt.task.run('handlebars_to_static:post_template');
        done();
    });
  });

  function dateString(d){
    var timezone = -1*(Math.floor( d.getTimezoneOffset() / 60)*100 + (d.getTimezoneOffset() % 60));
    if(timezone>=0){
      timezone = '+'+(timezone.toString().length < 4 ? "0" : "")+timezone;
    }else{
      timezone = '-'+(Math.abs(timezone).toString().length < 4 ? "0" : "")+Math.abs(timezone);
    }
    return  [
              d.getFullYear(),
              d.getMonth()+1,
              d.getDate()
            ].join('-')
            +' '+
            [
              d.getHours(),
              d.getMinutes(),
              d.getSeconds()
            ].join(':')
            +' '+timezone;
  }
};