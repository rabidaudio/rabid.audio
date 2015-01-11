require 'nokogiri'

module Jekyll
  class BetterImageTag < Liquid::Tag

    # The regular expression syntax checker. Start with the language specifier.
    # Follow that by zero or more space separated options that take one of three
    # forms: name, name=value, or name="<quoted list>"
    # <quoted list> is a space-separated list of numbers
    #
    # http://rubular.com/r/obdiJOetAN
    SYNTAX = /^(\w[^\s]+|".*")((\s+[\w0-9\-_]+(=(\w+|"([^\s]+\s)*[^\s]+"))?)*) ?$/

    IMG_SRC = Jekyll.configuration({})['imgurl']

    def initialize(tag_name, markup, tokens)
      super
      if markup.strip =~ SYNTAX
        @src        = $1
        @attributes = {}
        classes     = ['img-wrapper']
        @citation   = {}
        @caption    = nil
        if defined?($2) && $2 != ''
          # Split along 3 possible forms -- key="<quoted list>", key=value, or key
          $2.scan(/(?:\w="[^"]*"|\w=\w|\w)+/) do |opt|
            key, value = opt.split('=')
            value.gsub!(/"/, "") unless value.nil?

            if key == "cite"
              @citation[:name], @citation[:link], @citation[:license] = value.split("|").map{|x| x.strip }
            elsif key == "caption"
              @caption = value
            elsif key == "class"
              classes.push value.split(" ")
            elsif value
              # key=value tokens are attributes
              @attributes[key.to_sym] = value
            else
              # simple tokens are classes
              classes.push key
            end
          end
        end
      else
        throw SyntaxError.new <<-eos
Syntax Error in tag 'i' while parsing the following markup:
  #{markup}
Valid syntax: {% i src [<classes>] [caption=value] [cite="Copyright owner [|url [|license] ]"] [<attributes=values>] %}
eos
      end
      @src = "#{IMG_SRC}#{@src}" unless IMG_SRC.nil? or @src.match(/^https?:\/\//)
      @attributes[:class]=classes.join(" ")
    end

    def render(context)
      ImageBlock.new(@src, @attributes, @caption, @citation).to_html
    end
  end
end

class ImageBlock
  def initialize(src, attrs={}, caption=nil, citation={})
    @doc = Nokogiri::HTML::DocumentFragment.parse ""

    Nokogiri::HTML::Builder.with(@doc) do |doc|
        doc.div(attrs) {

          # image and hover link
          doc.a(class: 'img-description-link'){
            doc.img(src: src, alt: caption, license: citation[:license])

            #caption block
            unless caption.nil?
              doc.div(class: 'img-description'){
                doc.div caption
              }
            end
          }

          # citation block
          unless citation.empty?
            doc.div(class: 'img-citation'){
              if citation[:link]
                doc.a(href: citation[:link], title: (citation[:license] or "Unknown license")) {
                  doc.text citation[:name]
                }
              else
                doc.span(title: (citation[:license] or "Unknown license")) {
                  doc.text citation[:name]
                }
              end
            }
          end
        }
    end
  end 

  def to_html
    @doc.to_html
  end
end

Liquid::Template.register_tag('i', Jekyll::BetterImageTag)