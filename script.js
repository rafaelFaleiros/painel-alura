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
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    document.getElementById('courses-table').innerHTML = '<tr><td colspan="3">Erro ao carregar os dados.</td></tr>';
    document.getElementById('guides-table').innerHTML = '<tr><td colspan="4">Erro ao carregar os dados.</td></tr>';
  }
}

// Função para exibir os cursos na tabela
function displayCourses(courses) {
  const tableBody = document.getElementById('courses-table');
  tableBody.innerHTML = ''; // Limpa os dados anteriores

  courses.forEach(course => {
    const lastAccessDate = new Date(course.lastAccessTime).toLocaleDateString(); // Converte o timestamp
    const row = `
      <tr>
        <td>${course.name}</td>
        <td>${lastAccessDate}</td>
        <td>${course.progress}%</td>
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
    const row = `
      <tr>
        <td>${guide.name}</td>
        <td>${lastAccessDate}</td>
        <td>${guide.totalCourses}</td>
        <td>${guide.finishedCourses}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Chama a função ao carregar a página
fetchApiData();
