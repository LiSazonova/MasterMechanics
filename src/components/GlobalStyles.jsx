export default function GlobalStyles() {
  return (
    <style>{`
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
      a:focus-visible,button:focus-visible,.focus-ring:focus-visible{outline:2px solid var(--orange);outline-offset:3px}
      .focus-ring-inset:focus-visible{outline:2px solid var(--orange);outline-offset:-2px}
      @media (prefers-reduced-motion:reduce){
        html{scroll-behavior:auto}
        *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
      }
    `}</style>
  );
}
