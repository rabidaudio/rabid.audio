require 'debug'

class Builders::PostImages < SiteBuilder
    def build
        # TODO: support alt text
        liquid_tag :img, as_block: true do |classes, tag|
            css_class = ['image-container', *classes.split(' ')].join(' ')
            images = tag.content.lines.map(&:chomp).reject(&:empty?).map { |l| "<img src='/images/#{l}'>" }.join("\n")
            <<~HTML
                <div class="#{css_class}">#{images}</div>
            HTML
        end
    end
end
