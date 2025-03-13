class Builders::Blogspot < SiteBuilder

    class BlogspotPost
        attr_accessor :post

        def initialize(post_data, blog_name)
            @post = HashWithDotAccess::Hash.new(post_data)
            @blog_name = blog_name
        end

        def title
            post.title["$t"]
        end

        def categories
            (post.category || []).filter { |c| c.scheme == 'http://www.blogger.com/atom/ns#' }.map(&:term)
        end

        def date
            Bridgetown::Utils.parse_date(post.updated['$t'])
        end

        def body
            if post.content.type != 'html'
                raise StandardError, "Unsupported post type: #{post.content.type} for post #{title}"
            end
            post.content['$t']
        end

        def virtual_filename
            "#{date.to_date.iso8601}-#{Pathname.new(path).basename.to_s}"
        end

        def path
            post.link.find { |l| l.rel == 'alternate' }.href.delete_prefix("https://#{@blog_name}")
        end

        def permalink
            path.delete_suffix('.html') + "/"
        end

        def author
            return nil if post.author.first.name['$t'] == 'Anonymous'

            post.author.first.email['$t']
        end

        def params
            [:title, :categories, :date, :author, :permalink].each_with_object({}) do |method, hash|
                hash[method] = self.send(method)
            end
        end
    end

    def build
        generator :blogspot_json
    end

    def blogspot_json
        (site.metadata.blogspot_archives || {}).each do |blog_name, config|
            read_posts(blog_name).each do |post|
                add_resource(:posts, post.virtual_filename) do
                    ___ post.params # load front matter from hash
                    layout(config.layout || :post)
                    content(post.body)
                end
            end
        end
    end

    def root
        Pathname.new(site.root_dir)
    end

    def posts_path(blog_name)
        root.join("src/_data/blogspot_archives", blog_name, "posts.json").to_s
    end

    def read_posts(blog_name)
        JSON.parse(File.read(posts_path(blog_name))).map { |p| BlogspotPost.new(p, blog_name) }
    end
end
