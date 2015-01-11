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
        @src        = $1
        @attributes = {}
        classes    = ['img-wrapper']
        @citation     = {}
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
              @attributes[key.to_sym] = value
            else
              classes.push key
            end
          end
          @citation[:name], @citation[:link], @citation[:license] = @attributes[:source] if @attributes[:source].is_a? Array
          @citation[:name] = @attributes[:source] if @attributes[:source].is_a? String
        end
        @attributes[:linenos] = "inline" if @attributes.key?(:linenos) and @attributes[:linenos] == true
      else
        throw SyntaxError.new <<-eos
Syntax Error in tag 'i' while parsing the following markup:
  #{markup}
Valid syntax: {% i source [<classes>] [<attributes=values>] %}
eos
      end
      @src = IMG_SRC + @src unless IMG_SRC.nil? or @src.match(/^https?:\/\//)
      @attributes[:class]=classes.join(" ")
      if @attributes[:caption]
        @attributes[:caption] = @attributes[:caption].join(" ") #put it back together
        # @attributes[:title]   = @attributes[:caption] if @attributes[:title].nil?
        # @attributes[:alt]     = @attributes[:caption] if @attributes[:alt].nil?
      end
      # p @src
      # p @attributes
      # p @classes
      # p @citation
      # puts "\n\n"
    end

    def render(context)
      ImageBlock.new(@src, @attributes, @citation).to_html
    end
  end
end

class ImageBlock
  def initialize(src, attrs={}, citation=nil)
    @doc = Nokogiri::HTML::DocumentFragment.parse ""

    Nokogiri::HTML::Builder.with(@doc) do |doc|
        doc.div(attrs) {

          # image and hover link
          doc.a(class: 'img-description-link'){
            doc.img(src: src)
            
            #caption block
            doc.div(class: 'img-description'){
              doc.div attrs[:caption]
            } unless attrs[:caption].nil?
          }

          # citation block
          doc.div(class: 'img-citation'){
            if citation[:link]
              doc.a(href: citation[:link], title: "License: #{(citation[:license] or "unknown")}") {
                doc.text citation[:name]
              }
            else
              doc.span(title: "License: #{(citation[:license] or "unknown")}") {
                doc.text citation[:name]
              }
            end
          } unless citation.nil?
        }
    end
  end 

  def to_html
    @doc.to_html
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