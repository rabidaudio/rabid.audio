require 'nokogiri'
module Jekyll
  class BetterImageTag < Liquid::Tag

    # The regular expression syntax checker. Start with the language specifier.
    # Follow that by zero or more space separated options that take one of three
    # forms: name, name=value, or name="<quoted list>"
    #
    # <quoted list> is a space-separated list of numbers
    SYNTAX = /^(\w[^\s]+|".*")((\s+[\w0-9\-_]+(=(\w+|"([^\s]+\s)*[^\s]+"))?)*) ?$/

    IMG_SRC = Jekyll.configuration({})['imgurl']

    def initialize(tag_name, markup, tokens)
      super
      if markup.strip =~ SYNTAX
        @src     = $1
        @options = {}
        @classes = ['img-wrapper']
        @source  = {}
        if defined?($2) && $2 != ''
          # Split along 3 possible forms -- key="<quoted list>", key=value, or key
          $2.scan(/(?:\w="[^"]*"|\w=\w|\w)+/) do |opt|
            key, value = opt.split('=')
            if value
              # If a quoted list, convert to array
              if value.include?("\"")
                value.gsub!(/"/, "")
                value = value.split
              end
              @options[key.to_sym] = value
            else
              @classes.push key
            end
          end
          @caption = @options[:caption]
          @source[:name], @source[:link], @source[:license] = @options[:source] if @options[:source].is_a? Array
          @source[:name] = @options[:source] if @options[:source].is_a? String
        end
        @options[:linenos] = "inline" if @options.key?(:linenos) and @options[:linenos] == true
      else
        throw SyntaxError.new <<-eos
Syntax Error in tag 'i' while parsing the following markup:
  #{markup}
Valid syntax: {% i source [<classes>] [<attributes=values>] %}
eos
      end
      @src = IMG_SRC + @src unless IMG_SRC.nil? || @src.match(/^https?:\/\//)
      p @src
      p @options
      p @classes
      p @caption
      p @source
      puts "\n\n"
    end

    def render(context)
      "<div class='#{@classes.join(' ')}'><img src='#{@src}'></div>"
    end
  end
end

Liquid::Template.register_tag('i', Jekyll::BetterImageTag)


# => http://rubular.com/r/obdiJOetAN

# ^(\w[^\s]+|".*")((\s+[\w0-9-_]+(=(\w+|"([^\s]+\s)*[^\s]+"))?)*)$

# http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg
# cat.jpg
# cat.jpg left
# cat.jpg right large caption=adorbs
# http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg source=Wikimedia
# http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg source="Wikimedia http://commons.wikimedia.org/wiki/File:Triac.svg"
# http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg source="Wikimedia http://commons.wikimedia.org/wiki/File:Triac.svg CC-BY-SA-30"

# "a new image.jpg"
# cat.jpg meow-1-2

# BAD:

# .jpg
# "dog .jpg
# cat.jpg !WGA?
# cat.jpg source=
# cat.jpg source="a b