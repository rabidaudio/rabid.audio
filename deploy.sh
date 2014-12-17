#!/bin/bash
git push origin master
jekyll build
divshot push
divshot promote development production
echo "Check it out:

    http://rabid.audio

"
