// Build a comprehensive context string with Naveed's complete profile
export async function getProfileContext(): Promise<string> {
  const naveedProfile = `
NAVEED ABBASI - FULL STACK DEVELOPER PROFILE

=== PERSONAL INFORMATION ===
Name: Naveed Abbasi
Age: 18 Years
Nationality: Pakistan
Location: Sarfaraz Society, Hyderabad
Freelance Status: Available
Phone: +92 311 1309060
Email: naveedabbasi8651@gmail.com
Languages: English, Urdu

=== PROFESSIONAL SUMMARY ===
I am a Full Stack Developer specializing in MERN (MongoDB, Express.js, React.js, Node.js). I build modern, responsive, and scalable web applications with a focus on both frontend and backend. Skilled in React, TypeScript, Tailwind CSS, and Node.js, I integrate REST APIs, authentication systems, and dynamic features to deliver fully functional, user-friendly websites. I turn Figma designs into clean, maintainable code that performs flawlessly across all devices.

=== TECHNICAL SKILLS ===
Frontend Skills:
- HTML: 89%
- CSS: 70%
- JavaScript: 75%
- React.js: 85%
- TypeScript: 70%
- Next.js: 60%
- Tailwind CSS
- Redux, Zustand (State Management)
- GSAP (Animations)
- Quill (Rich Text Editor)

Backend Skills:
- Node.js: 85%
- Express.js
- MongoDB
- Firebase (Firestore, Auth, Storage)
- JWT Authentication
- REST APIs
- Socket.IO (Real-time Communication)

Tools & Technologies:
- Google Generative AI (Gemini API)
- Axios
- Nodemailer
- Multer (File Uploads)
- Firebase
- Vercel
- ESLint, Prettier
- Git/GitHub

=== PROFESSIONAL EXPERIENCE ===

1. Freelance MERN Stack Developer (2025 - Present)
   Company: Self-Employed
   Description: Working with clients to build MERN-based web applications, including responsive UIs and essential backend features.

2. MERN Stack Developer (2025)
   Company: Verior
   Duration: 2 months full-time, paid onsite internship
   Description: Worked on real-world projects using React.js, Node.js, Express.js, and MongoDB.

3. Frontend Developer (2024 - 2025)
   Company: Digital Elliptical
   Duration: 3 months full-time onsite role
   Description: Built responsive web applications with React.js, Tailwind CSS, and modern UI/UX practices.

4. Frontend Developer (2024)
   Company: YoungDevIntern
   Duration: 1 month remote internship
   Description: Worked on static and interactive websites using HTML, CSS, and JavaScript.

=== EDUCATION ===

1. BS Software Engineering (2025 - Present)
   Institution: Virtual University of Pakistan
   Description: Pursuing first year with strong focus on core software engineering fundamentals.

2. Web & Mobile App Development (2023-2024)
   Institution: SMIT Hyderabad
   Description: Completed comprehensive course in web and mobile app development.

3. Memorization of Quran (2017-2021)
   Institution: Madrasa Tajweed-ul-Quran
   Description: Successfully completed Hifz-e-Quran with focus on Tajweed.

=== PORTFOLIO PROJECTS ===

1. Online Book Exchange Platform (FullStack, 1 month)
   - MERN stack project with real-time chat using Socket.IO
   - Features: Book upload, exchange requests, approve/reject system, real-time chat
   - Technologies: React, Node.js, Express, MongoDB, Socket.IO, Nodemailer, JWT, Multer
   - Live: https://book-store-five-nu.vercel.app/

2. Real-Time Chat App (FullStack, 1 week)
   - Complete MERN chat application with OTP verification
   - Features: Authentication, OTP flow, friend system, real-time messaging, online status
   - Technologies: MongoDB, Express, React, Node.js, Socket.IO, Zustand, Tailwind CSS, Nodemailer

3. Ecommerce Web App (FullStack, 3 weeks)
   - Fully functional e-commerce platform
   - Features: Product catalog, filtering, shopping cart, checkout, order history, reviews
   - Technologies: React, Context API, Tailwind CSS

4. Gemini AI Application (Frontend, 2 days)
   - Next.js + TypeScript + Gemini API integration
   - Features: AI-powered content generation, server-side rendering, streaming responses
   - Technologies: Next.js, TypeScript, Tailwind CSS, Gemini API

5. Social Media App (Frontend, 1 week)
   - Comprehensive social platform with user engagement features
   - Features: Profiles, posts, likes, comments, follow system, infinite scroll, search
   - Technologies: React, Redux Toolkit, Tailwind CSS, Firebase

6. Background Removal Tool (Frontend, 1 week)
   - Image editing UI with real-time preview
   - Features: Image upload, background removal, before/after comparison, download
   - Technologies: React, Tailwind CSS

7. Job and Event Management System (FullStack, 1 day - Hackathon)
   - Complete system with separate admin and user panels
   - Features: Job posting, event creation, applications, participation tracking
   - Technologies: React, Firebase Firestore, Firebase Auth, React Bootstrap, Material UI, Formik, Yup, Chart.js

8. Medium Blog Website (Frontend, 5 weeks)
   - Blog platform with tagging and search
   - Features: Post creation, tag categorization, search, reading time estimation, social sharing
   - Technologies: React, Tailwind CSS

9. IT Developers Agency Website (Frontend, 1 week)
   - Professional agency landing page
   - Features: Service showcase, team profiles, case studies, contact form, smooth animations
   - Technologies: HTML, CSS, JavaScript, GSAP

=== CONTACT & SOCIAL MEDIA ===
LinkedIn: https://www.linkedin.com/in/naveed-abbasi
WhatsApp: https://wa.me/923111309060
Instagram: https://www.instagram.com/naveed_abbasi316/
Email: naveedabbasi8651@gmail.com
Phone: +92 311 1309060

=== KEY STRENGTHS ===
- Full Stack Development (Frontend & Backend)
- MERN Stack Expert
- Real-time Communication (Socket.IO)
- API Integration
- Authentication & Security
- Responsive Design
- TypeScript & Type Safety
- Database Design (MongoDB, Firebase)
- AI Integration (Gemini API)
- Git & Version Control
- Performance Optimization
- UI/UX Best Practices
`;

  return naveedProfile;
}

export default getProfileContext;
