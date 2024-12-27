// URL da API
const apiUrl = 'https://www.alura.com.br/api/dashboard/c33bd1c6166344663cfee491d078d0ef3bb316dc30d4e45b2ade71b6a7487c8f';

// Função para buscar os dados da API
async function fetchApiData() {
  try {
    const response = await fetch(apiUrl); // Faz a requisição à API
    const data = await response.json();  // Converte a resposta para JSON

    // Organiza os dados nas tabelas
    displayCourses(data.courseProgresses);
    populateCourseSelect(data.courseProgresses); // Preenche o select com os cursos iniciados
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    document.getElementById('course-list-display').innerHTML = '<li>Erro ao carregar os cursos.</li>';
  }
}

// Função para preencher o campo de seleção de cursos com os cursos já iniciados
function populateCourseSelect(courses) {
  const courseSelect = document.getElementById('courseName'); // Campo de seleção de cursos no formulário

  // Limpa o conteúdo anterior
  courseSelect.innerHTML = '';

  // Adiciona uma opção padrão
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Selecione um curso';
  courseSelect.appendChild(defaultOption);

  // Adiciona os cursos no select
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.name; // Usamos o nome do curso como valor
    option.textContent = course.name; // Nome do curso visível
    courseSelect.appendChild(option);
  });
}

// Função para capturar e exibir os cursos planejados
document.getElementById('course-planning-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário e recarregamento da página

  // Captura os dados inseridos no formulário
  const courseName = document.getElementById('courseName').value;
  const priorityLevel = document.getElementById('priorityLevel').value;
  const completionDate = document.getElementById('completionDate').value;
  const totalHours = document.getElementById('totalHours').value;

  // Valida os dados antes de adicionar
  if (!courseName || !priorityLevel || !completionDate || !totalHours) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  // Cria um objeto com os dados do curso
  const courseData = {
    name: courseName,
    priorityLevel: priorityLevel,
    completionDate: completionDate,
    totalHours: totalHours
  };

  // Adiciona o curso à lista de cursos
  addCourseToList(courseData);

  // Limpa o formulário após o envio
  document.getElementById('course-planning-form').reset();
});

// Função para adicionar o curso à lista exibida na página
function addCourseToList(courseData) {
  const courseList = document.getElementById('course-list-display');

  // Cria um novo item de lista
  const li = document.createElement('li');
  li.classList.add('course-item');

  // Adiciona as informações do curso no item
  li.innerHTML = `
    <h3>${courseData.name}</h3>
    <p><strong>Prioridade:</strong> ${courseData.priorityLevel}</p>
    <p><strong>Data de Conclusão:</strong> ${courseData.completionDate}</p>
    <p><strong>Total de Horas:</strong> ${courseData.totalHours} horas</p>
  `;

  // Adiciona o item na lista
  courseList.appendChild(li);
}

// Chama a função ao carregar a página
fetchApiData();


// Função para exibir os cursos na tela
function displayCourses(courseProgresses) {
  const courseList = document.getElementById('course-list-display');
  courseList.innerHTML = ''; // Limpa a lista antes de exibir os cursos novamente

  courseProgresses.forEach(course => {
    const li = document.createElement('li');
    li.classList.add('course-item');
    li.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Progresso:</strong> ${course.progress}%</p>
    `;
    courseList.appendChild(li);
  });
}
