---
title: Using Grunt with Jekyll
layout: post
published: false
categories:
tags:
-software
-javascript
-blogging
mathjax: false
---

As you can see, I finally have my new blog going. I was originally going to write a Jekyll-like CMS with Node and Backbone,
but I finally gave in and used the real thing. It's a lot more flexible than I expected, and over all I'm loving it. There
was just one thing I learned in my previous attempt that I really wanted, and that was Grunt. 

If you aren't familiar, [`grunt`](http://gruntjs.com) is a script runner for javascript, analagous to `rake` in the Rails
world. My first experience with it was trying to fix a broken Gruntfile from a Yeoman generator, and I was quite intimidated.
But I've picked up enough now to know it is really not so bad. I'm going to build up my Gruntfile for Jekyll step-by-step,
and hopefully explain how to use Grunt in the process.

### Preparation

You want to start by making a `package.json` file for your project if you don't already have one. This will be useful for
saving all the `npm` packages your grunt needs to work for anyone who clones/forks your code at a later date. Simply run

    npm init

and follow the prompts.

You then need to install the command line interface globally, so that you can run it from the terminal:

    npm install -g grunt-cli

And you need to install an instance of grunt locally:

    npm install --save-dev grunt

The `--save-dev` will save this as a required development package for your project. Other developers can use
`npm install --dev` to install all the dependencies. This is separate from `--save` so that you can separate the executing
dependancies of your project (perhaps `connect` or `express` if you are running a web server) from the packages useful
for developing the project (your test suite, for example).

Now you need to make a file called `Gruntfile.js` in the root directory of your project. This is where you define all of
the tasks you can run. Here's the skeleton:

{% highlight javascript %}
module.exports = function(grunt) {

  grunt.initConfig({

  });

  grunt.registerTask('default', []);
});
{% endhighlight %}

## Adding Tasks

### Jekyll

Common Grunt tasks are shared via `npm`. All(?) of them have a name that starts with `grunt-`. For example, here's one
that's really useful for me: [`grunt-jekyll`](https://www.npmjs.com/package/grunt-jekyll). It allows me to run `jekyll build`
from inside a grunt task. Since this is one of the most important things to do in my project, that's pretty important.

We start by installing the package, the same way we did with `grunt`:

    npm install --save-dev grunt-jekyll

Now there are three things we need to do to get this task configured in our `Gruntfile.js`. First, we need to load the task with

{% highlight javascript %}
grunt.loadNpmTasks('grunt-jekyll');
{% endhighlight %}

This makes the package available to `grunt`. Then we need to add the configuration. If we look at the documentation, it tells us
all the configuration options for this package. Inside `grunt.initConfig`, we need to add a `jekyll` configuration. Each item
inside is a specific task. 

{% highlight javascript %}
grunt.initConfig({
  jekyll: {
    //Production Build
    dist: {
      options: {
        dest: '_site/blog',
        config: '_config.yml'
      }
    },
    //Develpemnt Build
    dev: {
      options: {
        dest: '_site/blog',
        config: '_config.yml',
        drafts: true
      }
    }
  }
});
{% endhighlight %}

Here I have two `jekyll` tasks, one for each target. On my production builds, I want to simply do `jekyll build`, but for development
builds, I want to also include drafts so I can see what my current draft looks like. I tell it which configuration file to use. Now
you can run both of these tasks:

    grunt jekyll:dist
    grunt jekyll:dev

If we simply run `grunt jekyll`, it will run all the targets, one after another. Now, there are a lot more options we can set for this
task, but I'm using mostly the default options, so we can simplify this significantly:

{% highlight javascript %}
jekyll: {
  dist: {},
  dev: { options: { drafts: true } }
}
{% endhighlight %}

Here's our whole file at present:

{% highlight javascript %}
module.exports = function(grunt) {

  //load tasks
  grunt.loadNpmTasks('grunt-jekyll');

  //configure tasks
  grunt.initConfig({
    jekyll: {
      dist: {},
      dev: { options: { drafts: true } }
    }
  });

  grunt.registerTask('default', []);
});
{% endhighlight %}

We will talk about that last line, `grunt.registerTask`, in just a minute, but to see it's value, let's add another task first.

### JSHint

Let's add another step to our build process, and lint our javascript with [`jshint`](https://www.npmjs.com/package/grunt-contrib-jshint).
I keep my custom javascript files in `_src` and my third party files from [Bower](http://bower.io) in `_vendor`, for reasons
which will be more apparent shortly. I'm assuming you are familiar with `jshint` already. To install another task, it's the
same process: install, load, configure:

    npm install --save-dev grunt-contrib-jshint

{% highlight javascript %}
grunt.loadNpmTasks('grunt-contrib-jshint');
{% endhighlight %}

{% highlight javascript %}
grunt.initConfig({
  ...
  jshint:{
    src: ['_src/**/*.js']
  }
});
{% endhighlight %}

I have a `.jshintrc` file already in my project, so it knows what rules to follow. I made one task, `src`, which takes as options
an array of files or directories to lint, in this case any javascript file inside my `_src` directory (no need to lint `bower` packages).
Since there is only one task, we can run this like

    grunt jshint

Nice! Now, while I'm developing and constantly testing some javascript, it would be annoying to have jshint run after every change, but
I would like it to run before I push a real production build. But running

    grunt jshint && grunt jekyll:dist

is kind of annoying. The real value of a task runner is that you can string together multiple tasks. So let's make a `build` and a
`devbuild` task, the first wich runs `jshint` and then `jekyll:dist` and the second which runs `jekyll:dev`:

{% highlight javascript %}
grunt.registerTask('build', ['jshint', 'jekyll:dist']);
grunt.registerTask('devbuild', ['jekyll:dev']);
grunt.registerTask('default', []);
{% endhighlight %}

We simply `registerTask` with the name of the task and an array of subtasks to run in the order we want to run them. Simple and awesome.
That `default` one is special, it's the task to run if we don't specify a task. Let's set it to run `build`:

{% highlight javascript %}
grunt.registerTask('default', ['build']);
{% endhighlight %}

Now try it with

    grunt

and it should run `jshint` first and then `jekyll:dist`.

### Divshot

Now that we've got  the hang of this, I'm going to quickly throw in a `delpoy` task. GitHub has free hosting for Jekyll blogs, but I'm
currently trying out [Divshot](http://divshot.io), which is kind of similar to Heroku but for static sites. There's a package already,
[`grunt-divshot`](https://www.npmjs.com/package/grunt-divshot), which I install, load, and make some default tasks for. This package
has a webserver built in, but I'm going to use connect, so I simply don't use the `divshot` task (which runs `divshot:server`), and
instead make a separate task, `divshot:push`, with two sub-targets, `development` and `production`. No need to configure anything
because it's already in my `divshot.json` config file. This dimonstrates another cool feature of `grunt`: tasks are infinitely sub-
dividable. To deploy to production would be `grunt divshot:push:production` while to push to both would be `runt divshot:push`. And
naturally, I make two deploy tasks which build first:

{% highlight javascript %}
grunt.registerTask('devdeploy', ['devbuild', 'divshot:push:development']);
grunt.registerTask('deploy', ['build', 'divshot:push:production']);
{% endhighlight %}

### Javascript Compiling

Including a whole bunch of separate javascript files can really slow down your page load. Every separate resource (individual `js` or
`css` file, image, etc.) causes the browser to make a separate HTTP request, opening a separate TCP connection to the server, creating
all this overhead to send a few kilobytes. With `sass` (already built into Jekyll), all our stylesheets get compiled into a single
`css/main.css` file. We can do a similar thing for our javascript, compressing it in the process. Two popular packages are
[`grunt-contrib-concat`](https://www.npmjs.com/package/grunt-contrib-concat), which will concatinate files together, and
[`grunt-contrib-uglify`](https://www.npmjs.com/package/grunt-contrib-uglify), which can combine and compress javascript
files to a single minified script. On production builds, I want my output javascript file (which I'm keeping in `js/output.js`) to be
minified for speed. But when developing, I want unminifed versions of my javascript so I can step through it with the debugger if I
need it. So I use `concat` for development builds and `uglify` for production. Same song: install, load, and configure.

{% highlight javascript %}
grunt.initConfig({
  ...
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
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
    },
    dev: {
      src: ['<%= cfg.vendor %>', '_src/**/*.js'],
      dest: 'js/output.js',
    },
  },
});
{% endhighlight %}

The `<%= %>` parts are templates. Grunt will execute what's inside as javascript and put the result there. We can grab variables from
JSON or YAML files as such:

{% highlight javascript %}
grunt.initConfig({

  //config files
  pkg: grunt.file.readJSON('package.json'),
  cfg: grunt.file.readYAML('_config.yml'),

  ...
{% endhighlight %}

In this case, I'm reading from `package.json` for some variables and `_config.yml` for others. In my `_config.yml`, I made a list
of the javascript files from my `bower` packages to include, called `vendor`, so once I've loaded the config file, I can acess this
with `cfg.vendor`. Grunt is smart enough to take the string `'<%= cfg.vendor %>'`, replace it with my YAML array, and then flatten the
whole files array so that `output.js` is made of first my included bower javascript files, followed by all javascript files inside the
`_src` directory. Note that while `uglify` has one task, `dist`, with options, `concat` has an `options` object which applies to all
tasks (of which there is only `dev`). Most grunt tasks allow for global options which can be overwritten by individual tasks.


## Advanced Tasks

Up to this point, all these tasks have been pretty simple. You might be wondering why you'd bother with grunt at all and not just make
some shell scripts. Well, one benefit is cross-compatibility; any platform with Node.js can use it. Another is the ability to make 
hierarchies of tasks. To do the same in scripts would require one script for each task or a bunch of function definations. Still,
that's a pretty reasonable point. The next task is something that would be significantly more work to script but is painless in grunt.
But first, let's add some cool features to our existing Gruntfile.


### Autoload Tasks and Time Them

Right now, we have a stack of these `loadNpmTasks` commands:

{% highlight javascript %}
grunt.loadNpmTasks('grunt-jekyll);
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-divshot');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
{% endhighlight %}

This could potentially get really long if we keep adding tasks at this rate. Of course, all of these packages are listed in our
`package.json` file, since we are using `--save-dev`. So there's a neat package
[`load-grunt-tasks`](https://www.npmjs.com/package/load-grunt-tasks) which will run all of these automatically. Just install it and
replace all of these `loadNpmTasks` statements with a single line:

{% highlight javascript %}
require('load-grunt-tasks')(grunt);
{% endhighlight %}

Now, even if we install more grunt tasks, we don't need to load them. We can simply skip that step and jump straight to the configuration.

Here's another little one, [`time-grunt`](https://www.npmjs.com/package/time-grunt), which will tell us the execution time of every
grunt task. Simply install it and add

{% highlight javascript %}
require('time-grunt')(grunt);
{% endhighlight %}


### Watch and Serve Locally

Now the real magic happens. One of the most popular grunt tasks is
[`grunt-contrib-watch`](https://www.npmjs.com/package/grunt-contrib-watch), which allows you to run tasks when files change.
We can also add a local server to see what the site looks like currently. Since we're using Node, we can use the amazing
[`connect`](https://www.npmjs.com/package/connect), secifically the grunt task implementation,
[`grunt-contrib-connect`](https://www.npmjs.com/package/grunt-contrib-connect). Combining these two together with a feature
[`connect-livereload`](https://www.npmjs.com/package/connect-livereload), we can make a task which starts a webserver
and listens for file changes, automatically rebuilding the project and **refreshing the page in the browser.**

    npm install --save-dev grunt-contrib-watch grunt-contrib-connect connect-livereload

{% highlight javascript %}
grunt.initConfig({
  ...
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
  }
});
{% endhighlight %}

Let's break this down. `watch` has some global options and two filesets to watch, `scripts` which runs our whole `devbuild`
task including recompiling our javascript, while `content` just runs `jekyll:dev`. To get `connect` to host the livereload
script, we need to return `require('connect-livereload')({port: LIVERELOAD_PORT})` as the first middleware object. Meanwhile,
`mountFolder` is a simple function at the top of the script to serve up static files:

{% highlight javascript %}
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
{% endhighlight %}

Finally, we tack on [`grunt-open`](https://www.npmjs.com/package/grunt-open) and we can even automatically open the site in
a new tab.

{% highlight javascript %}
open: {
  server: {
    path: 'http://localhost:<%= connect.options.port %>/blog'
  }
}
{% endhighlight %}

Now that we have all of these partial tasks, let's make the default task open the server and watch for changes.

{% highlight javascript %}
grunt.registerTask('serve', ['devbuild', 'connect:livereload', 'open:server', 'watch']);
grunt.registerTask('default', ['serve']);
{% endhighlight %}


## Custom Tasks

Last but not least, let's add a custom task for making new posts. There's a
[sublime package](https://github.com/23maverick23/sublime-jekyll) that will let you do this, but my installation of
sublime is buggy and plugins mess up. To make a custom task, simply call `registerTask` with the task name, a
description, and a callback to execute. Any subtasks will be included as arguments to the function, e.g. 'new:post'
will call the `new` task with the first argument `"post"`.

{% highlight javascript %}
grunt.registerTask('new', 'Start a new post or draft', function(type) {
  ...
});
{% endhighlight %}

I made a function to ask for the post title and copy a file `_templates/post.md` to the correct folder
(`_draft` or `_post`) with the correct name and current date. Then using
[`grunt-open`](https://www.npmjs.com/package/grunt-open) it opens this file in your preferred text editor (from
`package.json` or the `$EDITOR` enivronment variable).

Here's the link to my complete `Gruntfile.js` if you want to see it all. Looking at a complete file like this can
be pretty intimidating, but hopefully by building it up a little bit at a time you can build one for your next
project.