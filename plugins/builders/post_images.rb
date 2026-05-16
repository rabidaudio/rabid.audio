# require 'debug'

class Builders::PostImages < SiteBuilder
    def build
        liquid_tag :img, as_block: true do |args, tag|
            # debugger
            caption_arg, caption = *args.match(/\"([^\"]+)\"/)
            args = args.sub(caption_arg, '') if caption_arg
            classes = args.split(' ')
            css_class = ['image-container', *classes].join(' ')
            images = tag.content.lines.map(&:chomp).reject(&:empty?).map(&:strip).map do |l|
                url = expand_src(l, tag.context)
                alt = caption ? " alt=\"#{caption}\"" : ""
                <<~HTML
                    <div class="#{css_class}">
                        <img src='#{url}'#{alt}>
                    </div>
                HTML
            end.join("\n")
            <<~HTML
                <div class="image-parent">#{images}</div>
            HTML
        end
    end
    
    private

    def expand_src(src, context)
        return src if src.starts_with?("http")

        # check for the image in the post-specific image folder first
        page_name = File.basename(context['page']['relative_path'], ".*")
        absolute = File.join(context['site']['source'], 'images', page_name, src)
        # debugger
        return File.join('/images', page_name, src) if File.exist?(absolute)
        
        # if not there, assume it's relative to the top-level image folder
        File.join('/images', src)
    end
end
