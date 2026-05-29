# require 'debug'

# For posts tagged with a "project" field,
# this aggregates all posts matching that project onto site
# so that they can link to each other
class Builders::Projects < SiteBuilder
  def build
    hook :site, :pre_read do
      site.data['projects'] = {}
    end
    hook :posts, :post_read do |post|
        next unless post.data['project']

        p = post.data['project']
        site.data['projects'] ||= {}

        site.data['projects'][p] ||= {}
        title = post.data['title']
        src_dir = Pathname.new(site.root_dir).join('src')
        path = Pathname.new(post.path).relative_path_from(src_dir).to_s
        site.data['projects'][p][post.id] = { 'title' => title , 'path' => path }
        # ensure sorted
        site.data['projects'][p] = site.data['projects'][p].sort.to_h
    end
  end
end
