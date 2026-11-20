export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="brand-mark">UoG</div>
        <div>
          <p className="eyebrow">UNIVERSITY OF GONDAR</p>
          <h1>Public Health Academy</h1>
        </div>
        <a className="contact" href="https://t.me/besilencewell" target="_blank" rel="noreferrer">Contact developer</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="pill">LEARN · CONNECT · GROW</span>
          <h2>Building healthier communities starts with learning together.</h2>
          <p>A learning space for University of Gondar Health Officer students in Years 2–4 to access study resources, share knowledge, and support one another.</p>
          <div className="actions">
            <a className="primary" href="#learning">Explore learning</a>
            <a className="secondary" href="https://t.me/besilencewell" target="_blank" rel="noreferrer">Get help</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="card-icon">✚</div>
          <p className="card-label">STUDENT COMMUNITY</p>
          <h3>Knowledge for better health.</h3>
          <p>Study resources, peer learning, and academic collaboration in one place.</p>
          <div className="mini-stats">
            <div><strong>Years 2–4</strong><span>Student focus</span></div>
            <div><strong>Anytime</strong><span>Learn at your pace</span></div>
          </div>
        </div>
      </section>

      <section id="learning" className="features">
        <div className="section-heading">
          <p className="eyebrow">YOUR LEARNING SPACE</p>
          <h2>Everything starts with shared knowledge</h2>
          <p>This starter page is ready for the next development steps.</p>
        </div>
        <div className="feature-grid">
          <article className="feature"><span>01</span><h3>Study resources</h3><p>Organize notes, documents, images, audio, and video for learning.</p></article>
          <article className="feature"><span>02</span><h3>Student profiles</h3><p>Build student profiles and a safe registration and approval process.</p></article>
          <article className="feature"><span>03</span><h3>Learning community</h3><p>Prepare student posts, announcements, and peer discussions.</p></article>
        </div>
      </section>

      <footer>
        <p>UoG Public Health Academy</p>
        <p>Developed by <strong>Senay Addisu Belew</strong> · <a href="https://t.me/besilencewell" target="_blank" rel="noreferrer">@besilencewell</a></p>
      </footer>
    </main>
  );
}
