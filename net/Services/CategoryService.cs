using Data;
using Data.Entities;
using System;

namespace Services
{
    public class CategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return  _context.Categories.ToList();
        }
    }
}
