require 'debug'

class Builders::PostImages < SiteBuilder
    def build
        liquid_tag :img, as_block: true do |args, tag|
            caption_arg, caption = *args.match(/\"([^\"]+)\"/)
            args = args.sub(caption_arg, '') if caption_arg
            classes = args.split(' ')
            css_class = ['image-container', *classes].join(' ')
            images = tag.content.lines.map(&:chomp).reject(&:empty?).map do |l|
                url = l.starts_with?("http") ? l : "/images/#{l}"
                "<img src='#{url}'#{caption ? " alt=\"#{caption}\"" : ""}>"
            end.join("\n")
            <<~HTML
                <div class="#{css_class}">#{images}</div>
            HTML
        end
    end
end
