// Função para exibir os cursos na tela e preencher o select
function displayCourses(courseProgresses) {
  const courseList = document.getElementById('course-list-display');
  const courseSelect = document.getElementById('courseName');
  courseList.innerHTML = ''; // Limpa a lista antes de exibir os cursos novamente
  courseSelect.innerHTML = ''; // Limpa o select antes de adicionar os cursos

  courseProgresses.forEach(course => {
    // Exibe o curso na lista
    const li = document.createElement('li');
    li.classList.add('course-item');
    li.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Progresso:</strong> ${course.progress}%</p>
    `;
    courseList.appendChild(li);

    // Adiciona a opção de curso no select
    const option = document.createElement('option');
    option.value = course.name; // O valor do option será o nome do curso
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });

  // Preenche o formulário automaticamente quando um curso for selecionado
  courseSelect.addEventListener('change', function() {
    const selectedCourse = courseProgresses.find(course => course.name === courseSelect.value);
    if (selectedCourse) {
      document.getElementById('priorityLevel').value = 'Média'; // Ajuste conforme a lógica
      document.getElementById('completionDate').value = selectedCourse.completionDate || '';
      document.getElementById('totalHours').value = selectedCourse.totalHours || '';
    }
  });
}

// Função para adicionar o plano de estudo semanal
function addStudyPlan(courseData, courseProgress) {
  const today = new Date();
  const completionDate = new Date(courseData.completionDate);

  // Calcula a diferença em dias
  const timeDiff = completionDate - today;
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Arredonda para cima

  if (totalDays <= 0) {
    alert('A data de conclusão deve ser no futuro!');
    return;
  }

  // Calcula as horas restantes a partir do progresso
  const hoursStudied = (courseProgress.progress / 100) * courseData.totalHours;
  const remainingHours = Math.max(0, courseData.totalHours - hoursStudied); // Garante que não fique negativo

  const dailyStudyHours = Math.ceil(remainingHours / totalDays);
  const weeklyStudyHours = dailyStudyHours * 7;

  // Cria uma tabela para exibir o plano de estudo semanal
  const studyPlanTable = createStudyPlanTable(courseData, weeklyStudyHours);
  const planContainer = document.getElementById('study-plan');

  // Cria um novo bloco para cada plano de estudo
  const planBlock = document.createElement('div');
  planBlock.classList.add('plan-block');
  planBlock.innerHTML = `
    <h4>Plano de Estudo: ${courseData.name}</h4>
  `;
  planBlock.appendChild(studyPlanTable);
  planContainer.appendChild(planBlock); // Adiciona o novo plano sem apagar os anteriores
}

// Função para criar a tabela de estudo semanal
function createStudyPlanTable(courseData, totalWeeklyHours) {
  const table = document.createElement('table');
  table.classList.add('study-plan-table');

  // Cabeçalho da tabela
  const headerRow = document.createElement('tr');
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  daysOfWeek.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Linha de horas distribuídas
  const hoursRow = document.createElement('tr');
  const hoursPerDay = distributeStudyHours(totalWeeklyHours);

  hoursPerDay.forEach(hours => {
    const td = document.createElement('td');
    td.textContent = `${hours} horas`;
    hoursRow.appendChild(td);
  });

  table.appendChild(hoursRow);

  // Linha dos cursos distribuídos
  const coursesRow = document.createElement('tr');
  const courseHours = distributeCourses(courseData, hoursPerDay);

  courseHours.forEach(course => {
    const td = document.createElement('td');
    td.textContent = course;
    coursesRow.appendChild(td);
  });

  table.appendChild(coursesRow);

  return table;
}

// Função para distribuir as horas de estudo durante a semana
function distributeStudyHours(totalWeeklyHours) {
  const hoursPerDay = [0, 0, 0, 0, 0, 0, 0];

  // Prioriza os finais de semana com mais horas
  const weekendHours = Math.ceil(totalWeeklyHours * 0.6); // 60% das horas no final de semana
  const weekdayHours = totalWeeklyHours - weekendHours;

  hoursPerDay[5] = Math.ceil(weekendHours / 2); // Sábado
  hoursPerDay[6] = Math.floor(weekendHours / 2); // Domingo

  // Distribui o restante das horas entre os dias úteis
  const weekdaySlots = 5;
  const hoursForWeekdays = Math.floor(weekdayHours / weekdaySlots);
  for (let i = 0; i < 5; i++) {
    hoursPerDay[i] = hoursForWeekdays;
  }

  // Ajusta para garantir que o total seja igual às horas semanais
  const distributedHours = hoursPerDay.reduce((sum, hours) => sum + hours, 0);
  if (distributedHours < totalWeeklyHours) {
    hoursPerDay[0] += totalWeeklyHours - distributedHours; // Ajusta o excesso no primeiro dia
  }

  return hoursPerDay;
}

// Função para distribuir os cursos de acordo com as horas da semana
function distributeCourses(courseData, hoursPerDay) {
  const coursesPerDay = [];
  let remainingHours = courseData.totalHours;

  // Distribui as horas restantes entre os dias da semana
  hoursPerDay.forEach((hours, index) => {
    const hoursForCourse = Math.min(remainingHours, hours);
    remainingHours -= hoursForCourse;
    coursesPerDay.push(`${courseData.name} - ${hoursForCourse} horas`);
  });

  return coursesPerDay;
}

let data = null; // Defina a variável globalmente

// Função para buscar os dados da API
async function fetchApiData() {
  try {
    const response = await fetch('https://www.alura.com.br/api/dashboard/c33bd1c6166344663cfee491d078d0ef3bb316dc30d4e45b2ade71b6a7487c8f');
    data = await response.json(); // Armazene os dados na variável global

    // Acessando a propriedade correta 'courseProgresses'
    const courses = data.courseProgresses;

    if (!courses) {
      console.log("A propriedade 'courseProgresses' não foi encontrada nos dados.");
      return;
    }

    // Exibir os cursos na tela
    displayCourses(courses);

  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
  }
}

// Chama a função ao carregar a página
fetchApiData();

// Evento de submit do formulário
document.getElementById('course-planning-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Coletando os dados do formulário
  const courseName = document.getElementById('courseName').value;
  const priorityLevel = document.getElementById('priorityLevel').value;
  const completionDate = document.getElementById('completionDate').value;
  const totalHours = document.getElementById('totalHours').value;

  // Garantir que a variável 'data' foi carregada antes de usar
  if (data === null) {
    console.error('Os dados ainda não foram carregados.');
    return;
  }

  // Encontrando o progresso do curso selecionado
  const courseProgress = data.courseProgresses.find(course => course.name === courseName);

  // Se o curso não for encontrado
  if (!courseProgress) {
    console.error('Curso não encontrado.');
    return;
  }

  // Criando um objeto com as informações do planejamento
  const courseData = {
    name: courseName,
    priority: priorityLevel,
    completionDate: completionDate,
    totalHours: parseInt(totalHours)
  };

  // Adicionando o planejamento ao plano de estudo
  addStudyPlan(courseData, courseProgress);
});
