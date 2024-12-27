// URL da API
const apiUrl = 'https://www.alura.com.br/api/dashboard/c33bd1c6166344663cfee491d078d0ef3bb316dc30d4e45b2ade71b6a7487c8f';

// Função para buscar os dados da API
async function fetchApiData() {
  try {
    const response = await fetch(apiUrl); // Faz a requisição à API
    const data = await response.json();  // Converte a resposta para JSON

    // Organiza os dados nas tabelas
    displayCourses(data.courseProgresses);
    displayGuides(data.guides);
    createRanking(data.courseProgresses);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    document.getElementById('courses-table').innerHTML = '<tr><td colspan="3">Erro ao carregar os dados.</td></tr>';
    document.getElementById('guides-table').innerHTML = '<tr><td colspan="4">Erro ao carregar os dados.</td></tr>';
  }
}

// Função para exibir os cursos na tabela com diferenciação de progresso por cor
function displayCourses(courses) {
  const tableBody = document.getElementById('courses-table');
  tableBody.innerHTML = ''; // Limpa os dados anteriores

  courses.forEach(course => {
    const lastAccessDate = new Date(course.lastAccessTime).toLocaleDateString(); // Converte o timestamp
    const lastAccessDays = Math.floor((Date.now() - course.lastAccessTime) / (1000 * 3600 * 24)); // Tempo desde o último acesso

    // Cor de acordo com o progresso do curso
    let progressColor = '#f44336'; // Vermelho
    if (course.progress >= 50) progressColor = '#ff9800'; // Laranja
    if (course.progress === 100) progressColor = '#4caf50'; // Verde

    // Cria a barra de progresso
    const progressBar = `
      <div class="progress-bar">
        <div style="width: ${course.progress}%; background-color: ${progressColor};"></div>
        <span class="progress-number">${course.progress}%</span> <!-- Número dentro da barra -->
      </div>
    `;

    const row = `
      <tr>
        <td><a href="${course.slug}" target="_blank">${course.name}</a></td>
        <td>${lastAccessDate} (${lastAccessDays} dias atrás)</td>
        <td>${progressBar}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Função para exibir as formações na tabela
function displayGuides(guides) {
  const tableBody = document.getElementById('guides-table');
  tableBody.innerHTML = ''; // Limpa os dados anteriores

  guides.forEach(guide => {
    const lastAccessDate = new Date(guide.lastAccessTime).toLocaleDateString(); // Converte o timestamp
    const lastAccessDays = Math.floor((Date.now() - guide.lastAccessTime) / (1000 * 3600 * 24)); // Tempo desde o último acesso

    const row = `
      <tr>
        <td><a href="${guide.url}" target="_blank">${guide.name}</a></td>
        <td>${lastAccessDate} (${lastAccessDays} dias atrás)</td>
        <td>${guide.totalCourses}</td>
        <td>${guide.finishedCourses}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Função para criar ranking dos cursos
function createRanking(courses) {
  const sortedCourses = [...courses].sort((a, b) => b.progress - a.progress); // Ordena do mais avançado para o menos
  const topCourses = sortedCourses.slice(0, 3); // Top 3 cursos mais avançados
  const bottomCourses = sortedCourses.slice(-3); // Top 3 cursos menos avançados

  const rankingContainer = document.getElementById('ranking');
  rankingContainer.innerHTML = `<h2>Ranking dos Cursos</h2>
  <h3>Top 3 Cursos Mais Avançados</h3>
  <ul>
    ${topCourses.map(course => `<li>${course.name} - ${course.progress}%</li>`).join('')}
  </ul>
  <h3>Top 3 Cursos Menos Avançados</h3>
  <ul>
    ${bottomCourses.map(course => `<li>${course.name} - ${course.progress}%</li>`).join('')}
  </ul>`;
}

// Chama a função ao carregar a página
fetchApiData();
