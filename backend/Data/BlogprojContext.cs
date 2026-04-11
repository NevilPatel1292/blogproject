using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Blogproj.Model;

namespace Blogproj.Data
{
    public class BlogprojContext : DbContext
    {
        public BlogprojContext (DbContextOptions<BlogprojContext> options)
            : base(options)
        {
        }

        public DbSet<Blogproj.Model.Blogs> Blogs { get; set; } = default!;
    }
}
