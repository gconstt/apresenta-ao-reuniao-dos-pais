/*
  Este arquivo lê os dados de data.js e monta o HTML.
  Não é necessário editar aqui — as informações ficam em data.js.
*/

const ARROW_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" y1="12" x2="19" y2="12"></line>
    <polyline points="13 6 19 12 13 18"></polyline>
  </svg>
`;

const BACK_ICON = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="12" x2="5" y2="12"></line>
    <polyline points="11 18 5 12 11 6"></polyline>
  </svg>
`;

/* ---------- Página 1: grade de crachás ---------- */

function montarGrade() {
  const grid = document.getElementById("badge-grid");
  if (!grid) return;

  grid.innerHTML = ESTUDANTES.map(pessoa => `
    <a class="badge-link" href="perfil.html?id=${pessoa.id}" aria-label="Ver perfil de ${pessoa.nome}">
      <div class="badge-hook"><span></span></div>
      <article class="badge-card" style="--strap-color:${pessoa.cor}">
        <div class="badge-strap"></div>
        <div class="badge-punch"></div>
        <div class="badge-body">
          <div class="badge-avatar" style="--avatar-color:${pessoa.cor}">${pessoa.iniciais}</div>
          <h2 class="badge-name">${pessoa.nome}</h2>
          <p class="badge-role">${pessoa.curso}</p>
          <div class="badge-perforation"></div>
          <span class="badge-cta">Ver perfil ${ARROW_ICON}</span>
        </div>
      </article>
    </a>
  `).join("");
}

/* ---------- Página 2: perfil individual ---------- */

function montarPerfil() {
  const root = document.getElementById("profile-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const pessoa = ESTUDANTES.find(p => p.id === id);

  if (!pessoa) {
    root.innerHTML = `
      <a class="back-link" href="index.html">${BACK_ICON} Voltar à equipe</a>
      <div class="not-found">
        <p>Não encontramos esse perfil.</p>
      </div>
    `;
    return;
  }

  document.title = pessoa.nome + " — Perfil";

  root.innerHTML = `
    <a class="back-link" href="index.html">${BACK_ICON} Voltar à equipe</a>

    <article class="profile-badge" style="--strap-color:${pessoa.cor}">
      <div class="profile-strap"></div>
      <div class="profile-punch"></div>
      <span class="stamp">Apresentador(a)</span>

      <div class="profile-top">
        <div class="profile-avatar" style="--avatar-color:${pessoa.cor}">${pessoa.iniciais}</div>
        <h1 class="profile-name">${pessoa.nome}</h1>
        <p class="profile-role">${pessoa.curso}</p>
      </div>

      <div class="profile-perforation"></div>

      <div class="profile-content">
        <div class="profile-section">
          <h2>Sobre</h2>
          <p>${pessoa.bio}</p>
        </div>

        <div class="profile-section">
          <h2>Especialidades</h2>
          <div class="tag-list">
            ${pessoa.especialidades.map(e => `<span class="tag">${e}</span>`).join("")}
          </div>
        </div>

        <div class="profile-section">
          <h2>Curiosidade</h2>
          <p>${pessoa.curiosidade}</p>
        </div>

        <div class="profile-section">
          <h2>Contato</h2>
          <span class="profile-contact" style="--avatar-color:${pessoa.cor}">${pessoa.contato}</span>
        </div>
      </div>
    </article>
  `;
}

montarGrade();
montarPerfil();