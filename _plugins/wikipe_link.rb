module Jekyll
  class WkipeTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      args = text.split('|', 2)
      page = args.shift.strip
      if args.empty? then @text = page else @text = args.shift.strip end
      @page = page.gsub(" ","_")
    end

    def render(context)
      "<a class=\"wikipedia\" href=\"http://wki.pe/#{@page}\">#{@text}</a>"
    end
  end
end

Liquid::Template.register_tag('wkipe', Jekyll::WkipeTag)