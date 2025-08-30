# Samacar Website - Full Admin Panel

A modern, full-featured news and content management website built with Laravel 12, React 19, and Filament 4. This application provides a complete content management system with an admin panel, user authentication, and a responsive frontend.

## 🚀 Features

### Content Management
- **Articles & News**: Rich text editor with media support, categories, tags, and SEO optimization
- **Books & Chapters**: Digital book management with chapter organization
- **Papers & Documents**: Document management with download tracking and rate limiting
- **Festivals & Events**: Event management system
- **Pages**: Static page management (About, Contact, FAQ, Policies)
- **Quotations**: Quote management system
- **Comments**: User commenting system with moderation

### User Management
- **Authentication**: Laravel Sanctum-based authentication
- **User Roles**: Role-based access control (Super Admin, Admin, User)
- **Profile Management**: User profile customization
- **Membership System**: Membership status tracking

### Admin Panel
- **Filament 4**: Modern admin interface with drag-and-drop functionality
- **Media Library**: Spatie Media Library integration for file management
- **Rich Content Editor**: Advanced content editing with custom blocks
- **Search & Filtering**: Advanced search capabilities across all content
- **Analytics Dashboard**: Content and user analytics

### Frontend Features
- **React 19**: Modern React with TypeScript
- **Inertia.js v2**: Seamless SPA experience
- **Tailwind CSS v4**: Modern styling with dark mode support
- **Responsive Design**: Mobile-first responsive design
- **SEO Optimized**: Meta tags, structured data, and SEO-friendly URLs
- **Performance**: Optimized loading with Vite bundling

### Security & Performance
- **Rate Limiting**: Download and contact form rate limiting
- **Content Security**: HTML purification and XSS protection
- **File Upload Security**: Secure file handling with validation
- **Caching**: Efficient caching strategies
- **Database Optimization**: Eager loading and query optimization

## 🛠 Tech Stack

### Backend
- **PHP 8.2+** - Modern PHP with type declarations
- **Laravel 12** - Latest Laravel framework
- **Filament 4** - Admin panel framework
- **Laravel Sanctum** - API authentication
- **Spatie Media Library** - File management
- **Laravel Scout** - Search functionality
- **SQLite/MySQL** - Database support

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Inertia.js v2** - SPA framework
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Zustand** - State management

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PHPUnit** - Testing framework
- **Laravel Pint** - PHP code style fixer

## 📋 Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (for development) or MySQL/PostgreSQL (for production)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahapranta/news-blog
   cd news-blog
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   # For SQLite (development)
   touch database/database.sqlite
   
   # Or configure MySQL/PostgreSQL in .env
   
   php artisan migrate
   php artisan db:seed
   ```

6. **Build assets**
   ```bash
   npm run build
   ```

7. **Start development server**
   ```bash
   # Using Laravel's built-in server
   php artisan serve
   
   # Or use the dev script for full development environment
   composer run dev
   ```

### Database Seeding

The application comes with comprehensive seeders:

```bash
php artisan db:seed                    # Run all seeders
php artisan db:seed --class=UserSeeder # Run specific seeder
```

Default admin credentials:
- Email: `pranta1204@gmail.com`
- Password: `12345678`

### File Structure

```
app/
├── Filament/           # Admin panel resources
│   ├── Resources/      # CRUD resources
│   ├── Forms/          # Custom form components
│   └── Clusters/       # Admin panel organization
├── Http/
│   ├── Controllers/    # Web controllers
│   ├── Requests/       # Form requests
│   └── Resources/      # API resources
├── Models/             # Eloquent models
└── Services/           # Business logic services

resources/
├── js/
│   ├── components/     # React components
│   ├── pages/          # Inertia pages
│   ├── layouts/        # Page layouts
│   └── hooks/          # Custom React hooks
└── css/
    └── app.css         # Main stylesheet
```

## 🎨 Customization

### Adding New Content Types

1. Create a new model with migration
2. Create a Filament resource
3. Add routes in `routes/web.php`
4. Create React components in `resources/js/pages/`

### Styling

The application uses Tailwind CSS v4 with custom components. Main styling files:
- `resources/css/app.css` - Global styles
- `resources/js/components/` - Reusable UI components

### Admin Panel Customization

Filament resources are located in `app/Filament/Resources/`. Each resource can be customized with:
- Custom forms and tables
- Actions and bulk actions
- Filters and search
- Custom widgets

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/ArticleTest.php

# Run with coverage
php artisan test --coverage
```

## 📦 Deployment

### Production Build

```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm ci
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables

Key environment variables for production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The PHP framework
- [Filament](https://filamentphp.com/) - The admin panel framework
- [Inertia.js](https://inertiajs.com/) - The SPA framework
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [React](https://reactjs.org/) - The JavaScript library

---

**Built with ❤️ using modern web technologies**
