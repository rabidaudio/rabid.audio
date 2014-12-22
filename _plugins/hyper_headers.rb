
# #Monkey Patch (Kramdown 1.5.0)
module Kramdown
  module Converter
    class Html < Base
      alias old_convert_header convert_header
      def convert_header(el, indent)
        attr = el.attr.dup
        if @options[:auto_ids] && !attr['id']
          attr['id'] = generate_id(el.options[:raw_text])
        end
        @toc << [el.options[:level], attr['id'], el.children] if attr['id'] && in_toc?(el)
        level = output_header_level(el.options[:level])
        a_attr = {"href"=> "\##{attr['id']}", "class"=> "header-link" }
        format_as_span_html("a", a_attr, format_as_block_html("h#{level}", attr, inner(el, indent), indent))
      end
    end
  end
end