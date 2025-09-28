// ArticleDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ArticleDetailPage.css';

const ArticleDetailPage = () => {
  const location = useLocation();
  console.log("Current location:", location);
  const val = useParams();
  const id = val.id;
  console.log("Article ID from params:", val);
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Mock article data - replace with your API call
  const mockArticlesData = {
    1: {
      id: 1,
      title: "Tech Giant Announces Revolutionary AI Breakthrough",
      content: `
        <p>In a groundbreaking announcement that has sent shockwaves through the technology industry, TechCorp unveiled its latest artificial intelligence breakthrough that promises to revolutionize how we interact with digital systems.</p>
        
        <p>The company's new AI system, codenamed "Project Genesis," represents a significant leap forward in machine learning capabilities, demonstrating unprecedented accuracy in complex problem-solving scenarios. During a live demonstration at their headquarters, the AI system successfully completed tasks that would typically require human-level cognitive abilities.</p>
        
        <h2>Key Features of the Breakthrough</h2>
        
        <p>The revolutionary system incorporates several cutting-edge technologies:</p>
        
        <ul>
          <li><strong>Advanced Natural Language Processing:</strong> The AI can understand and respond to complex human queries with remarkable accuracy, processing context and nuance in ways previously thought impossible.</li>
          <li><strong>Multi-Modal Learning:</strong> Unlike traditional AI systems that focus on single data types, this breakthrough can simultaneously process text, images, audio, and video inputs to provide comprehensive solutions.</li>
          <li><strong>Ethical AI Framework:</strong> Built with robust safety measures and ethical guidelines, ensuring responsible deployment across various industries.</li>
          <li><strong>Real-Time Adaptation:</strong> The system can learn and adapt to new scenarios instantly, without requiring extensive retraining periods.</li>
        </ul>
        
        <h2>Industry Impact</h2>
        
        <p>Industry experts predict that this breakthrough will have far-reaching implications across multiple sectors. Dr. Sarah Mitchell, AI researcher at Stanford University, commented: "This represents one of the most significant advances in artificial intelligence we've seen in the past decade. The potential applications are virtually limitless."</p>
        
        <p>The technology is expected to transform industries including healthcare, finance, education, and entertainment. Early partnerships with major corporations suggest widespread adoption could begin as early as next quarter.</p>
        
        <h2>Future Developments</h2>
        
        <p>TechCorp has announced plans to open-source portions of their research, allowing the broader scientific community to build upon these innovations. The company is also investing $2 billion in additional research and development to further enhance the system's capabilities.</p>
        
        <p>CEO John Thompson stated, "We believe this technology has the potential to solve some of humanity's greatest challenges. Our commitment to responsible innovation ensures that these advances benefit everyone, not just a select few."</p>
      `,
      company: "TechCorp",
      publishedDate: "2025-09-25",
      readTime: "8 min read",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Senior Technology Correspondent with over 10 years of experience covering emerging technologies and their impact on society."
      },
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      category: "Technology",
      tags: ["AI", "Machine Learning", "Innovation", "Technology"],
      views: 12500,
      likes: 847,
      shares: 231
    },
    2: {
      id: 2,
      title: "Green Energy Company Secures Major Investment Round",
      content: `
        <p>GreenPower Inc, a leading renewable energy startup, has successfully closed its Series B funding round, raising $50 million to accelerate the expansion of its innovative solar panel manufacturing capabilities.</p>
        
        <p>The investment round was led by CleanTech Ventures, with participation from several prominent venture capital firms and strategic investors, including major energy corporations looking to diversify their portfolios toward sustainable solutions.</p>
        
        <h2>Revolutionary Solar Technology</h2>
        
        <p>GreenPower's breakthrough lies in their proprietary solar cell technology that achieves 30% higher efficiency rates compared to traditional panels while reducing manufacturing costs by 25%. This advancement addresses two critical barriers to widespread solar adoption: cost and efficiency.</p>
        
        <p>The company's innovative approach combines advanced materials science with streamlined manufacturing processes, resulting in solar panels that not only perform better but are also more affordable for consumers and businesses alike.</p>
        
        <h2>Market Expansion Plans</h2>
        
        <p>With this new funding, GreenPower plans to:</p>
        
        <ul>
          <li>Scale production capacity from 100MW to 1GW annually</li>
          <li>Expand operations to three new manufacturing facilities</li>
          <li>Hire 500+ additional employees across engineering and production</li>
          <li>Accelerate research and development for next-generation technologies</li>
        </ul>
        
        <p>CEO Maria Rodriguez commented, "This investment validates our vision of making clean energy accessible to everyone. We're not just building better solar panels; we're building a sustainable future."</p>
      `,
      company: "GreenPower Inc",
      publishedDate: "2025-09-24",
      readTime: "6 min read",
      author: {
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1dc?w=150&h=150&fit=crop&crop=face",
        bio: "Environmental journalist specializing in clean energy and sustainability reporting."
      },
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop",
      category: "Energy",
      tags: ["Green Energy", "Solar Power", "Investment", "Sustainability"],
      views: 8900,
      likes: 623,
      shares: 187
    }
  };

  // Mock related articles
  const mockRelatedArticles = [
    {
      id: 3,
      title: "Healthcare Innovation: New Treatment Shows Promise",
      company: "MediTech Solutions",
      publishedDate: "2025-09-23",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      category: "Healthcare"
    },
    {
      id: 4,
      title: "Financial Services Platform Launches Global Expansion",
      company: "FinanceFlow",
      publishedDate: "2025-09-22",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
      category: "Finance"
    },
    {
      id: 5,
      title: "Automotive Company Unveils Electric Vehicle Line",
      company: "AutoElectric Ltd",
      publishedDate: "2025-09-21",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=300&h=200&fit=crop",
      category: "Automotive"
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch article data
    setTimeout(() => {
      const articleData = mockArticlesData[id];
      if (articleData) {
        setArticle(articleData);
        setRelatedArticles(mockRelatedArticles);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBackToNews = () => {
    navigate(-1); // Go back to previous page
  };

  const handleRelatedArticleClick = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;
    
    let shareUrl;
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="article-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page">
        <div className="article-not-found">
          <h2>Article Not Found</h2>
          <p>The article you're looking for doesn't exist or has been removed.</p>
          <button className="back-button" onClick={handleBackToNews}>
            ← Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-container">
        {/* Navigation */}
        <nav className="article-nav">
          <button className="back-button" onClick={handleBackToNews}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m7 7l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to News
          </button>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-meta-top">
            <span className="article-category">{article.category}</span>
            <span className="article-read-time">{article.readTime}</span>
          </div>
          
          <h1 className="article-title">{article.title}</h1>
          
          <div className="article-meta">
            <div className="author-info">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="author-avatar"
              />
              <div className="author-details">
                <span className="author-name">{article.author.name}</span>
                <span className="publish-date">{formatDate(article.publishedDate)} • {article.company}</span>
              </div>
            </div>
            
            <div className="article-stats">
              <span className="stat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {formatNumber(article.views)} views
              </span>
              <span className="stat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {formatNumber(article.likes)}
              </span>
            </div>
          </div>
        </header>

        {/* Article Image */}
        <div className="article-image-container">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="article-image"
          />
        </div>

        {/* Article Content */}
        <main className="article-content">
          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </main>

        {/* Article Footer */}
        <footer className="article-footer">
          <div className="article-tags">
            <span className="tags-label">Tags:</span>
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          <div className="share-section">
            <span className="share-label">Share this article:</span>
            <div className="share-buttons">
              <button 
                className="share-btn twitter"
                onClick={() => handleShare('twitter')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.32 4.56c-.88.39-1.83.65-2.82.77 1.01-.61 1.79-1.57 2.15-2.71-.95.56-2 .97-3.12 1.19-.9-.95-2.17-1.55-3.58-1.55-2.71 0-4.91 2.2-4.91 4.91 0 .39.04.76.13 1.12-4.08-.2-7.69-2.16-10.11-5.13-.42.73-.67 1.57-.67 2.47 0 1.7.87 3.21 2.19 4.09-.81-.03-1.56-.25-2.23-.62v.06c0 2.38 1.69 4.37 3.95 4.82-.41.11-.85.17-1.3.17-.32 0-.63-.03-.93-.09.63 1.96 2.46 3.38 4.63 3.42-1.69 1.32-3.82 2.11-6.14 2.11-.4 0-.79-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.01-.63.96-.69 1.79-1.56 2.45-2.55z"/>
                </svg>
              </button>
              <button 
                className="share-btn facebook"
                onClick={() => handleShare('facebook')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.07C24 5.41 18.63.04 12 .04S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>
                </svg>
              </button>
              <button 
                className="share-btn linkedin"
                onClick={() => handleShare('linkedin')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07s.93-2.07 2.07-2.07 2.07.93 2.07 2.07-.93 2.07-2.07 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </footer>

        {/* Author Bio */}
        <section className="author-section">
          <div className="author-card">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="author-card-avatar"
            />
            <div className="author-card-info">
              <h3>About {article.author.name}</h3>
              <p>{article.author.bio}</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="related-articles">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {relatedArticles.map((relatedArticle) => (
              <div 
                key={relatedArticle.id} 
                className="related-card"
                onClick={() => handleRelatedArticleClick(relatedArticle.id)}
              >
                <img 
                  src={relatedArticle.imageUrl} 
                  alt={relatedArticle.title}
                  className="related-image"
                />
                <div className="related-content">
                  <span className="related-category">{relatedArticle.category}</span>
                  <h3 className="related-title">{relatedArticle.title}</h3>
                  <div className="related-meta">
                    <span>{relatedArticle.company}</span>
                    <span>{formatDate(relatedArticle.publishedDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
