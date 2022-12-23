---
layout: default
---

<style>
.schematic-container {
  display: flex;
}
.schematic-container img {
  width: 25%;
}
@media screen and (max-width: 550px) {
  .schematic-container {
    flex-wrap: wrap;
  }
  .schematic-container img {
    width: 50%;
  }
}
</style>

- [Technology](#technology)
  - [Custom modular synthesizer modules](#custom-modular-synthesizer-modules)
  - [Gameboy VST plugin](#gameboy-vst-plugin)
- [Music](#music)
  - [Blaseball: The Musical](#blaseball-the-musical)
  - [the garages](#the-garages)
  - [Serious Times](#serious-times)


## Technology

<!-- Technology: code examples (source code repositories), hardware schematics, software documentation, photo and/or video documentation. -->

### Custom modular synthesizer modules

<div class="schematic-container">
  <img src="/images/amp-schematic-core.png">
  <img src="/images/adsr-schematic-core.png">
  <img src="/images/clock_schematic.png">
  <img src="/images/util_schematic.png">
</div>

Off-and-on over several years, I've been designing my own synthesizer modules designed around the Eurorack form factor. I gave myself the challenge to design these from scratch; I can use simple schematics from textbooks and datasheet example circuits, and I can look at other circuits for ideas and inspiration, but I'm not cloning an existing circuit but instead coming up with my own designs.

I hope to eventually have a 4-voice polyphonic synthesizer with the basics: envelope, filter, amplifier, and LFO. Two modules are designed and undergoing final revisions, others are still in progress and therefore are missing documentation but the source code is available. The various modules are thoroughly documented on [the projects section of this site](/projects/synth), including descriptions of functionality, design, source code and schematics.

<ul style="list-style-type: none; display: flex; flex-direction: row; gap: 16px; padding-inline-start: 0;">
  <li><a href="/projects/synth">Description</a></li>
  <li><a href="https://github.com/rabidaudio/synthesizer">Source code and schematics</a></li>
</ul>

### Gameboy VST plugin

<img style="max-width: 300px" src="/images/gameboy-synth-screenshot.png" alt="plugin">

An open-source DAW plugin written with [JUCE](https://juce.com/) that exposes the sounds of the Nintendo Gameboy (and Color) as a software instrument for making chiptune sounds. It's a faithful recreation of both the sound and the limitations of the console, because it wraps Shay Green'S [Gb_Snd_Emu](www.slack.net/~ant/libs/audio.html#Gb_Snd_Emu), the audio implementation used by many emulators including [Visual Boy Advance - M](https://github.com/visualboyadvance-m/visualboyadvance-m).

<ul style="list-style-type: none; display: flex; flex-direction: row; gap: 16px; padding-inline-start: 0;">
  <li><a href="https://github.com/rabidaudio/gameboy-synth">Source code</a></li>
  <li><a href="https://github.com/rabidaudio/gameboy-synth/releases/tag/v0.0.1-alpha1">Download</a> (unsigned debug build, Mac-only)</li>
</ul>



<!-- splitter pedal -->
<!-- chorus pedal -->
<!-- hapticmetronome -->
<!-- LastFM -->

<!-- Music: Music performance, composition, and production: audio and/or video documentation, scores. -->

## Music

### Blaseball: The Musical

Nearly 40 volunteers from around the world organized via Discord to write, record, and edit a digital musical in 72 hours over the course of three weekends, centered around the baseball simulation horror game and internet phenomenon [Blaseball](https://blaseball.com/). As a production assistant, I maintained the website, edited the script, and tracked, verified, and organized recordings and sheet music, and some transcription.

<ul style="list-style-type: none; display: flex; flex-direction: row; gap: 16px; padding-inline-start: 0;">
  <li><a href="https://blaseballthemusical.com/">Website</a></li>
  <li><a href="https://drive.google.com/file/d/1QxX8BIvJmdSDyd-F015TYnnJ4tz-Nujv/view">Program</a></li>
  <li><a href="https://blaseballmusical.bandcamp.com/album/the-deaths-of-sebastian-telephone">Bandcamp</a></li>
  <li><a href="https://open.spotify.com/playlist/0ohj1O2VEJR82q55Vt0jsm?si=c6dda03504df4543">Spotify</a></li>
</ul>

<iframe width="560" height="315" src="https://www.youtube.com/embed/keKpHmwfIMk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### the garages

Contributor, a prolific 50+ member band/internet music collective. Regular "live" show contributor, with 3 guitar and bass parts across two shows. Produced one song for Tribute Act 3, where members cover other members songs. 

<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=3467737381/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=2873697696/transparent=true/" seamless><a href="https://thegarages.bandcamp.com/album/ta032-unearthed-2">TA03.2: UNEARTHED by the garages</a></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/visLwKGz-5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Serious Times

Solo post rock project. Self-producing music to practice recording and mixing.

<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1098434587&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/were-in-serious-times" title="Serious Times" target="_blank" style="color: #cccccc; text-decoration: none;">Serious Times</a> · <a href="https://soundcloud.com/were-in-serious-times/dont-tell-me-to-drink-more-water-again-2" title="Don&#x27;t Tell Me to Drink More Water Again" target="_blank" style="color: #cccccc; text-decoration: none;">Don&#x27;t Tell Me to Drink More Water Again</a></div>
