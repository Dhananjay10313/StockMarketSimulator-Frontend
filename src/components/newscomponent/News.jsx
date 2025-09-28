// NewsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsPage.css';

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  // Pagination settings
  const articlesPerPage = 6;

  // Mock news data - expanded to demonstrate pagination
  useEffect(() => {
    const mockNewsData = [
      {
        id: 1,
        title: "Tech Giant Announces Revolutionary AI Breakthrough",
        description: "Company XYZ reveals groundbreaking artificial intelligence technology that could transform the industry landscape...",
        company: "TechCorp",
        publishedDate: "2025-09-25",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
        category: "Technology"
      },
      {
        id: 2,
        title: "Green Energy Company Secures Major Investment Round",
        description: "Renewable energy startup closes $50M Series B funding to expand solar panel manufacturing capabilities...",
        company: "GreenPower Inc",
        publishedDate: "2025-09-24",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop",
        category: "Energy"
      },
      {
        id: 3,
        title: "Healthcare Innovation: New Treatment Shows Promise",
        description: "Clinical trials demonstrate significant success rates for novel therapeutic approach in treating chronic conditions...",
        company: "MediTech Solutions",
        publishedDate: "2025-09-23",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        category: "Healthcare"
      },
      {
        id: 4,
        title: "Financial Services Platform Launches Global Expansion",
        description: "Fintech company announces entry into 15 new international markets with localized payment solutions...",
        company: "FinanceFlow",
        publishedDate: "2025-09-22",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
        category: "Finance"
      },
      {
        id: 5,
        title: "Automotive Company Unveils Electric Vehicle Line",
        description: "Traditional automaker transitions to electric with new lineup featuring advanced battery technology and autonomous features...",
        company: "AutoElectric Ltd",
        publishedDate: "2025-09-21",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=300&h=200&fit=crop",
        category: "Automotive"
      },
      {
        id: 6,
        title: "E-commerce Platform Reports Record Growth",
        description: "Online marketplace achieves 200% year-over-year growth driven by innovative seller tools and enhanced user experience...",
        company: "ShopSmart",
        publishedDate: "2025-09-20",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
        category: "E-commerce"
      },
      {
        id: 7,
        title: "Biotech Firm Develops Breakthrough Cancer Treatment",
        description: "Revolutionary immunotherapy shows 85% success rate in early-stage clinical trials for aggressive cancer types...",
        company: "BioInnovate Corp",
        publishedDate: "2025-09-19",
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop",
        category: "Biotechnology"
      },
      {
        id: 8,
        title: "Space Technology Company Achieves Historic Milestone",
        description: "Private aerospace firm successfully completes first commercial satellite deployment mission with reusable rockets...",
        company: "StellarTech",
        publishedDate: "2025-09-18",
        imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
        category: "Aerospace"
      },
      {
        id: 9,
        title: "Cybersecurity Startup Raises $30M Series A",
        description: "AI-powered security platform secures funding to expand threat detection capabilities for enterprise clients...",
        company: "SecureNet AI",
        publishedDate: "2025-09-17",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop",
        category: "Cybersecurity"
      },
      {
        id: 10,
        title: "Food Tech Company Launches Plant-Based Meat Alternative",
        description: "Innovative protein technology creates sustainable meat substitute indistinguishable from traditional beef products...",
        company: "GreenMeat Labs",
        publishedDate: "2025-09-16",
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
        category: "Food Technology"
      },
      {
        id: 11,
        title: "EdTech Platform Transforms Online Learning Experience",
        description: "Virtual reality integration and AI tutoring systems revolutionize digital education for millions of students worldwide...",
        company: "EduVerse",
        publishedDate: "2025-09-15",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&h=200&fit=crop",
        category: "Education"
      },
      {
        id: 12,
        title: "Climate Tech Startup Develops Carbon Capture Solution",
        description: "Breakthrough technology removes CO2 from atmosphere at unprecedented scale, offering hope for climate change mitigation...",
        company: "CarbonCure Technologies",
        publishedDate: "2025-09-14",
        imageUrl: "https://images.unsplash.com/photo-1569163139394-de44885c7e3d?w=300&h=200&fit=crop",
        category: "Climate Technology"
      },
      {
        id: 13,
        title: "Quantum Computing Company Achieves Major Breakthrough",
        description: "Revolutionary quantum processor demonstrates quantum advantage in complex optimization problems for the first time...",
        company: "QuantumLeap Systems",
        publishedDate: "2025-09-13",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
        category: "Quantum Computing"
      },
      {
        id: 14,
        title: "Smart City Platform Deployed in Major Metropolitan Area",
        description: "IoT sensors and AI analytics optimize traffic flow, energy consumption, and public services for 5 million residents...",
        company: "UrbanTech Solutions",
        publishedDate: "2025-09-12",
        imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=300&h=200&fit=crop",
        category: "Smart City"
      },
      {
        id: 15,
        title: "Robotics Firm Unveils Autonomous Warehouse System",
        description: "AI-powered robots increase warehouse efficiency by 400% while reducing operational costs and human error rates...",
        company: "RoboLogistics",
        publishedDate: "2025-09-11",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
        category: "Robotics"
      }
    ];

    // Simulate API loading delay
    setTimeout(() => {
      setNewsArticles(mockNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(newsArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = newsArticles.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleCardClick = (newsId) => {
    // Navigate to individual news page - replace with your routing logic
    console.log(`Navigating to news article ${newsId}`);
    // Example: 
    navigate(`/news/${newsId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex pagination logic for showing ellipsis
      if (currentPage <= 3) {
        // Show first few pages + ellipsis + last page
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last few pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page + ellipsis + current page area + ellipsis + last page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="news-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="news-container">
        <header className="news-header">
          <h1 className="news-title">Latest News</h1>
          <p className="news-subtitle">Stay updated with the latest company developments and industry insights</p>
          <div className="news-stats">
            <span>Showing {startIndex + 1}-{Math.min(endIndex, newsArticles.length)} of {newsArticles.length} articles</span>
          </div>
        </header>

        <div className="news-grid">
          {currentArticles.map((article) => (
            <div 
              key={article.id} 
              className="news-card"
              onClick={() => handleCardClick(article.id)}
            >
              <div className="news-card-image">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop';
                  }}
                />
                <div className="news-category">{article.category}</div>
              </div>
              
              <div className="news-card-content">
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-card-description">{article.description}</p>
                
                <div className="news-card-footer">
                  <div className="news-meta">
                    <span className="company-name">{article.company}</span>
                    <span className="publish-date">{formatDate(article.publishedDate)}</span>
                  </div>
                  <div className="read-more">
                    Read More →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              {/* Previous Button */}
              <button 
                className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="pagination-numbers">
                {getPageNumbers().map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === '...' ? (
                      <span className="pagination-ellipsis">...</span>
                    ) : (
                      <button
                        className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Next Button */}
              <button 
                className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Page Information */}
            <div className="pagination-info">
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        )}

        {newsArticles.length === 0 && !loading && (
          <div className="no-news">
            <p>No news articles available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
