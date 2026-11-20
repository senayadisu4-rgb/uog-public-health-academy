import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: "📚", title: "Courses & study materials", am: "የትምህርት ማስታወሻዎች", text: "Organize learning files by academic year, semester and module. Admins can publish approved study resources.", tag: "LEARN" },
  { icon: "🧠", title: "Exam practice", am: "የፈተና ልምምድ", text: "A dedicated space for practice questions, answer explanations and revision activities as content is added.", tag: "PRACTICE" },
  { icon: "📂", title: "Resource library", am: "የፋይል ማዕከል", text: "A central library for documents, slides, images, audio and video resources with member access controls.", tag: "DISCOVER" },
  { icon: "👥", title: "Student community", am: "የተማሪዎች መወያያ", text: "Approved members can share academic updates, ask questions and learn from one another.", tag: "CONNECT" },
  { icon: "💬", title: "Private messaging", am: "የግል ውይይት", text: "A private text chat foundation for approved students to coordinate study and exchange ideas.", tag: "COLLABORATE" },
  { icon: "🔬", title: "Research support", am: "የምርምር ድጋፍ", text: "A planned home for research methods, proposal guidance, reference tools and project resources.", tag: "RESEARCH" },
  { icon: "🧑‍🎓", title: "Personal student profile", am: "የግል ፕሮፋይል", text: "Each member can manage their profile details, academic year and profile photo after approval.", tag: "YOUR SPACE" },
  { icon: "🛡️", title: "Admin-managed access", am: "የአድሚን ቁጥጥር", text: "New registrations stay pending until an administrator approves the account. Protected content uses database rules.", tag: "SECURE ACCESS" },
  { icon: "📣", title: "Announcements", am: "ማስታወቂያዎች", text: "A planned place for study updates, resource notices and important academic announcements.", tag: "STAY INFORMED" }
];

export default function Home() {
  return <>
    <header className="nav">
      <div className="navin">
        <div className="brand">
          <Image src="/uog-academy-logo.png" alt="University of Gondar logo" width={58} height={58} priority />
          <div>UoG Public Health Academy<small>LEARN · PRACTICE · SERVE</small></div>
        </div>
        <nav className="navlinks" aria-label="Main navigation">
          <a href="#features">Explore</a><a href="#years">Study years</a><Link href="/login">Log in</Link><Link href="/register">Join the academy ↗</Link>
        </nav>
      </div>
    </header>
    <main className="shell">
      <section className="hero" id="home">
        <div>
          <div className="eyebrow">🎓 Student learning portal · English + አማርኛ</div>
          <h1>Learn together.<br/><span>Serve healthier</span><br/>communities.</h1>
          <p>A student-focused digital learning space for Health Officer students in Years 2, 3 and 4. Bring study resources, exam preparation and student collaboration together in one organized place.</p>
          <p lang="am">የHealth Officer ተማሪዎች የትምህርት ማስታወሻ፣ የፈተና ልምምድ፣ የምርምር ሀብቶችና የተማሪዎች ግንኙነት በአንድ ቦታ እንዲያገኙ የተዘጋጀ መድረክ ነው።</p>
          <div className="actions"><Link className="button primary" href="/register">Request student access →</Link><Link className="button secondary" href="/login">Member login</Link></div>
          <div className="trustline"><span>✓ Admin-approved membership</span><span>✓ Year-based resources</span><span>✓ Mobile-friendly design</span></div>
        </div>
        <aside className="hero-card">
          <span className="pill">YOUR ACADEMIC SPACE</span>
          <h2>Everything for your study journey, in one place.</h2>
          <p>Join a structured student space designed around learning, sharing and public health practice.</p>
          <ul><li>Study resources by year and semester</li><li>Personal profile and member directory</li><li>Community posts and private chat</li><li>Administrator-managed learning library</li></ul>
          <div style={{marginTop:22}}><Link className="button" style={{background:"#f3c64e",color:"#102b50"}} href="/register">Get started →</Link></div>
        </aside>
      </section>

      <section className="stats" aria-label="Portal highlights">
        <div className="stat"><div className="stat-icon">📘</div><div><b>Year 2 · Year 3 · Year 4</b><small>Organized study pathways</small></div></div>
        <div className="stat"><div className="stat-icon">🔐</div><div><b>Approval-based access</b><small>Members approved by admin</small></div></div>
        <div className="stat"><div className="stat-icon">🌍</div><div><b>English + አማርኛ</b><small>Designed for our student community</small></div></div>
      </section>

      <section id="years">
        <div className="section-head"><div><h2>Choose your study year</h2><p>Learning areas are organized to help students find the right resources quickly.</p></div></div>
        <div className="pathway">
          <article className="year-card"><span className="year-num">ACADEMIC PATHWAY · 02</span><h3>Year 2</h3><p>Course notes, semester resources and revision materials for second-year students.</p><span className="smalllink">Semester 1 · Semester 2</span></article>
          <article className="year-card"><span className="year-num">ACADEMIC PATHWAY · 03</span><h3>Year 3</h3><p>Module resources, reference files and collaborative review for third-year students.</p><span className="smalllink">Semester 1 · Semester 2</span></article>
          <article className="year-card"><span className="year-num">ACADEMIC PATHWAY · 04</span><h3>Year 4</h3><p>Advanced review resources, research support and preparation for final-year study.</p><span className="smalllink">Semester 1 · Semester 2</span></article>
        </div>
      </section>

      <section id="features">
        <div className="section-head"><div><h2>A learning platform built around students</h2><p>Explore the main areas planned for the academy.</p></div></div>
        <div className="grid">{features.map((feature) => <article className="card" key={feature.title}><div className="iconbox">{feature.icon}</div><div className="feature-tag" style={{marginTop:15}}>{feature.tag}</div><h3>{feature.title}</h3><p style={{fontWeight:700,color:"#35536d",marginBottom:7}}>{feature.am}</p><p>{feature.text}</p></article>)}</div>
      </section>

      <section className="grid2" style={{marginTop:25}}>
        <article className="card"><div className="iconbox">📝</div><h3>How student access works</h3><p>1. Submit your registration request. 2. Confirm your email if required. 3. Wait for administrator approval. 4. Sign in to access member resources.</p><div className="actions"><Link className="button primary" href="/register">Register now</Link></div></article>
        <article className="card"><div className="iconbox">🤝</div><h3>Learn responsibly</h3><p>Share respectful academic content. Protect personal information and never post patient-identifiable information. Use resources according to their permissions.</p><div className="actions"><Link className="button secondary" href="/login">Already a member?</Link></div></article>
      </section>

      <div className="notice"><b>Academic content notice:</b> This is an independent student learning project and is not an official University of Gondar service. Course lists, curriculum and exam questions must be reviewed against approved university materials before being marked official. Placeholder areas are not verified course content.</div>
      <footer className="footer"><div><strong>UoG Public Health Academy</strong><br/><span>Learn together · Serve healthier communities</span></div><div>Developed by <strong>Senay Addisu Belew</strong><br/>Telegram: <a href="https://t.me/besilencewell" target="_blank" rel="noopener noreferrer">@besilencewell</a></div></footer>
    </main>
  </>;
}
