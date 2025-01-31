// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const ArticlesPage = () => {
//   const articles = [
//     {
//       title: "Understanding Modern Telemedicine Services",
//       excerpt: "Telemedicine is revolutionizing the way we access healthcare",
//       date: "October 15, 2024",
//       readTime: "2 min read"
//     },
//     {
//       title: "Top 5 Tips for Managing Stress in a Busy Lifestyle",
//       excerpt: "Stress affects both your mental and physical health. Here are five...",
//       date: "October 8, 2024",
//       readTime: "6 min read"
//     },
//     {
//       title: "The Role of Nutrition in Disease Prevention",
//       excerpt: "Discover how advanced medical technologies and...",
//       date: "November 27, 2024",
//       readTime: "5 min read"
//     },
//     {
//       title: "Importance of Regular Health Check-ups",
//       excerpt: "Regular health check-ups are essential for early detection and prevention...",
//       date: "September 24, 2024",
//       readTime: "8 min read"
//     }
//   ];

//   return (
//     <Container className="guide-page">
//       <header className="text-center mb-5">
//         <h1 className="main-title">Your Guide to Better Health</h1>
//         <h1 className="main-title">and Wellness</h1>
//         <p className="subtitle mt-3">
//           Explore our featured articles to stay updated on the latest<br />
//           healthcare trends, tips, and advancements.
//         </p>
//       </header>

//       <Row xs={1} md={2} lg={4} className="g-4">
//         {articles.map((article, index) => (
//           <Col key={index}>
//             <Card className="article-card h-100">
//               <Card.Body>
//                 <Card.Title className="article-title">{article.title}</Card.Title>
//                 <Card.Text className="article-excerpt">{article.excerpt}</Card.Text>
//                 <div className="article-meta">
//                   <span className="article-date">{article.date}</span>
//                   <span className="article-read-time">{article.readTime}</span>
//                 </div>
//                 <button className="read-more-btn">Read more...</button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default ArticlesPage;