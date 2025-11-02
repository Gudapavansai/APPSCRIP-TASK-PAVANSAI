import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, Search, User, ShoppingBag, Menu, X } from 'lucide-react';
// Import the CSS file
import './ProductListingPage.css'; 

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fallback products in case API fails
    const fallbackProducts = [
      { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", price: 109.95, category: "men's clothing" },
      { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", price: 22.3, category: "men's clothing" },
      { id: 3, title: "Mens Cotton Jacket", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", price: 55.99, category: "men's clothing" },
      { id: 4, title: "Mens Casual Slim Fit", image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", price: 15.99, category: "men's clothing" },
      { id: 5, title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", price: 695, category: "jewelery" },
      { id: 6, title: "Solid Gold Petite Micropave", image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg", price: 168, category: "jewelery" },
      { id: 7, title: "White Gold Plated Princess", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", price: 9.99, category: "jewelery" },
      { id: 8, title: "Pierced Owl Rose Gold Plated Stainless Steel Double", image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg", price: 10.99, category: "jewelery" },
      { id: 9, title: "WD 2TB Elements Portable External Hard Drive - USB 3.0", image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", price: 64, category: "electronics" },
      { id: 10, title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg", price: 109, category: "electronics" },
      { id: 11, title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5", image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg", price: 109, category: "electronics" },
      { id: 12, title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive", image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg", price: 114, category: "electronics" },
      { id: 13, title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin", image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", price: 599, category: "electronics" },
      { id: 14, title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", price: 999.99, category: "electronics" },
      { id: 15, title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg", price: 56.99, category: "women's clothing" },
      { id: 16, title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket", image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg", price: 29.95, category: "women's clothing" },
      { id: 17, title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats", image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg", price: 39.99, category: "women's clothing" },
      { id: 18, title: "MBJ Women's Solid Short Sleeve Boat Neck V", image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg", price: 9.85, category: "women's clothing" },
      { id: 19, title: "Opna Women's Short Sleeve Moisture", image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg", price: 7.95, category: "women's clothing" },
      { id: 20, title: "DANVOUY Womens T Shirt Casual Cotton Short", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", price: 12.99, category: "women's clothing" }
    ];

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        // Use fallback products if API fails
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="product-listing-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <button 
              className="menu-button lg-hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="logo">LOGO</div>
            
            <nav className="nav-links hidden-lg">
              <a href="#" className="nav-link">SHOP</a>
              <a href="#" className="nav-link">SKILLS</a>
              <a href="#" className="nav-link">STORIES</a>
              <a href="#" className="nav-link">ABOUT</a>
              <a href="#" className="nav-link">CONTACT US</a>
            </nav>
            
            <div className="icon-group">
              <Search size={20} className="icon search-icon hidden-sm" />
              <Heart size={20} className="icon" />
              <ShoppingBag size={20} className="icon" />
              <User size={20} className="icon hidden-sm" />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-menu lg-hidden">
            <a href="#" className="mobile-menu-item">SHOP</a>
            <a href="#" className="mobile-menu-item">SKILLS</a>
            <a href="#" className="mobile-menu-item">STORIES</a>
            <a href="#" className="mobile-menu-item">ABOUT</a>
            <a href="#" className="mobile-menu-item">CONTACT US</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">DISCOVER OUR PRODUCTS</h1>
        <p className="hero-description">
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. 
          Dolor integer scelerisque nibh amet mi ut elementum dolor.
        </p>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar-wrapper">
        <div className="filter-bar-container">
          <div className="filter-bar-content">
            <div className="filter-info-group">
              <span className="item-count">{filteredProducts.length} ITEMS</span>
              <button 
                className="filter-toggle-button lg-hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'HIDE FILTER' : 'SHOW FILTER'}
                <ChevronDown size={16} />
              </button>
            </div>
            
            <button className="filter-button hidden-lg">
              <span className="filter-text">Filter</span>
              <ChevronDown size={16} />
            </button>
            
            <select className="sort-select">
              <option>RECOMMENDED</option>
              <option>NEWEST FIRST</option>
              <option>POPULAR</option>
              <option>PRICE: HIGH TO LOW</option>
              <option>PRICE: LOW TO HIGH</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-container">
        <div className="main-content-layout">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="sidebar-filters">
              <div className="filters-header lg-hidden">
                <span className="filters-title">FILTERS</span>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="filter-options-group">
                <div className="filter-option-checkbox">
                  <label className="checkbox-label">
                    <input type="checkbox" className="filter-checkbox" />
                    <span className="filter-label-text">CUSTOMIZABLE</span>
                  </label>
                </div>
                
                {/* Filter Details (Repeated structure) */}
                {[
                  'IDEAL FOR', 'OCCASION', 'WORK', 'FABRIC', 
                  'SEGMENT', 'SUITABLE FOR', 'RAW MATERIALS', 'PATTERN'
                ].map((title) => (
                  <div key={title} className="filter-detail-section">
                    <details className="filter-details-group">
                      <summary className="filter-summary">
                        {title}
                        <ChevronDown size={16} className="chevron-icon" />
                      </summary>
                      <div className="filter-content">
                        <p className="filter-content-item">All</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <main className="product-grid-main">
            <div className="product-grid">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="product-image"
                      />
                      <button 
                        onClick={() => toggleFavorite(product.id)}
                        className="favorite-button"
                      >
                        <Heart 
                          size={18} 
                          className={favorites.has(product.id) ? 'heart-icon favorited' : 'heart-icon'}
                        />
                      </button>
                    </div>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-pricing-info">
                      <a href="#" className="pricing-link">Sign in</a> or Create an account to see pricing
                    </p>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top-grid">
            <div className="footer-signup">
              <h3 className="footer-heading">BE THE FIRST TO KNOW</h3>
              <p className="footer-text">Sign up for updates from mettā muse.</p>
              <div className="signup-form">
                <input 
                  type="email" 
                  placeholder="Enter your e-mail..."
                  className="signup-input"
                />
                <button className="signup-button">
                  SUBSCRIBE
                </button>
              </div>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-heading">CONTACT US</h3>
              <p className="footer-text">+44 221 133 5360</p>
              <p className="footer-text">customercare@mettamuse.com</p>
            </div>
            
            <div className="footer-currency">
              <h3 className="footer-heading">CURRENCY</h3>
              <select className="currency-select">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
            
            <div className="footer-follow">
              <h3 className="footer-heading">FOLLOW US</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><span>in</span></a>
                <a href="#" className="social-icon"><span>f</span></a>
              </div>
            </div>
          </div>
          
          <div className="footer-links-wrapper">
            <div className="footer-links-group">
              <h4 className="footer-sub-heading">mettā muse</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Stories</a></li>
                <li><a href="#" className="footer-link">Artisans</a></li>
                <li><a href="#" className="footer-link">Boutiques</a></li>
                <li><a href="#" className="footer-link">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-sub-heading">QUICK LINKS</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Orders & Shipping</a></li>
                <li><a href="#" className="footer-link">Join/Login as a Seller</a></li>
                <li><a href="#" className="footer-link">Payment & Pricing</a></li>
                <li><a href="#" className="footer-link">Return & Refunds</a></li>
                <li><a href="#" className="footer-link">FAQs</a></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-sub-heading">LEGAL</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-copyright">
            Copyright © 2023 mettamuse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductListingPage;