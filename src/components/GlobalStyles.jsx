export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Share+Tech+Mono&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{
        --black:#0a0a0a;--dark:#111111;--panel:#161616;--border:#222222;
        --orange:#f05a00;--orange2:#ff7a22;--white:#f0ede8;--gray:#888888;--light:#cccccc;
      }
      html{scroll-behavior:smooth;overflow-x:hidden}
      body{background:var(--black);color:var(--white);font-family:'Barlow',sans-serif;font-weight:300;overflow-x:hidden;max-width:100%}
      img,svg,iframe,video{max-width:100%;height:auto}
      #root{overflow-x:hidden;max-width:100%}
      section{max-width:100%}
      @media (max-width: 480px) {
        section { padding-left: 4vw !important; padding-right: 4vw !important; }
      }
      select option{background:var(--dark)}
    `}</style>
  );
}
