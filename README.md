Just another tech blog.

http://rabid.audio/blog

Set up
------

    gem install jekyll (maybe some others too?)
    npm install -g grunt-cli divshot
    npm install --dev
    bower install

also python pygments (`pip` or however)

run
---

Live-reload development watch server:

    grunt serve

develoment server:

    grunt devbuild
    grunt devdeploy


production server:

    grunt build
    grunt deploy


Detailed description of Grunt tasks on my blog (so meta)

See `_drafts/cheatsheet` for examples of most tags and YAML header options

Additions to default jekyll:

- [Grunt](Gruntfile.js)
- [youtube plugin](_plugins/youtube_tag.rb) [(not mine)](ttscoff/JekyllPlugins)
- [wikpe tag](_plugins/wkipe_link.rb)
- [snazzy bio block](_includes/headshot.html)
- [dynamic colors](_includes/clorset.html)
- A http://wki.pe/dinkus ([who knew that's what they were called?](_includes/dinkus.html) )
- [Switched crappy syntax highlighting style to highlight.js's monokai](_sass/monokai.scss)
- responsive grid from pure
- Javascript compiling
- warning about old blogger posts
- human readable dates
- 


Immediate TODOs:

- Fix About page
- Make a real homepage


Future ideas:

- Lightbox for images

- Add resume

- pretty backgrounds: Maps, canvas renders, ?

- All of jekyll build stuff and `grunt` could be replaced with `gulp` and would be much more effective.
If I ever continue work on Utterson, might be the way to go

- Re-setup IFTTT autotweeting

- drop jquery for speed

- colors for each category
  - existing colors: blue, green
  - existing categories: music, software, hardware, policy

Licence
=======

Blog content is all [CC-BY-SA](http://creativecommons.org/licenses/by-sa/4.0/). Custom code and design is [MIT](LICENSE).