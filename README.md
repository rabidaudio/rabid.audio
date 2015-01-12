Just another tech blog.

http://rabid.audio/blog

Set up
------

    bundle install
    npm install -g grunt-cli divshot
    npm install --dev
    bower install

also python pygments (`pip` or however)

run
---

    # Live-reload development watch server:
    grunt serve
    
    # develoment:
    grunt devbuild
    grunt devdeploy
    
    # production:
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
- [human readable dates](assets/_src/natural_date_replacements.js)
- [keyboard shortcuts](assets/_src/keyboard_shortcuts.js)
- [page swipe naviagation on mobile](assets/_src/page_swipe.js)
- [FontAwesome](http://fontawesome.io/)
- tags grouped and colored by category
- Last.FM album art home page
- [Special image tag](#improved-image-tag)

Immediate TODOs:

- Fix About page
- ~~Make a real homepage~~
- self-generating `all` pages for each category
- A way to include JS libs on a per-page basis (require-js??)
- Mobile scrolling for /all/
- update Gruntfile with less janky generator

Future ideas:

- Lightbox for images
- switch to using require.js (or similar)
- Add resume
- Comments? (probably needs a backend, but might be doable with firebase)
- pretty backgrounds: Maps, canvas renders, ?
- All of jekyll build stuff could be replaced with `grunt` or `gulp` which would be much more effective.
    - If I ever continue work on Utterson, might be the way to go
    - A Yeoman generator might be the shiz
- Re-setup IFTTT autotweeting
- drop jquery for speed
- ~~colors for each category~~
  - existing colors: blue, green, red, purple
  - existing categories: music, software, hardware, policy


Improved Image Tag
------------------

    {% i cat.jpg %}                     # automatically prefixes with imgurl from _config.yaml
    {% i cat.jpg float left xsmall %}   # attaching css classes
    {% i cat.jpg id="adorable" %}       # attaching HTML attributes
    {% i cat.jpg caption="How cute!" %} # pretty image captions (also updates alt text)

There's also a `cite` option:

    {% i http://example.com/images/cat.jpg cite="Example Site" %}
    {% i http://example.com/images/cat.jpg cite="Example Site | http://example.com/pages/my_pets.html" %}
    {% i http://example.com/images/cat.jpg cite="Example Site | http://example.com/pages/my_pets.html | CC BY-SA 3.0" %}

Good post notes
---------------

- Keep titles less than 32 characters, making use of the subtitle when neccessary
- add one category per post. Known categories are: `[software, hardware, policy, music]`
- add as many tags as desired to a post. Reuse existing tags (see [`_config.yaml`](_config.yaml))
- map new tags to a category for proper color coding


Licence
=======

Blog content is all [CC-BY-SA](http://creativecommons.org/licenses/by-sa/4.0/). Custom code and design is [MIT](LICENSE).