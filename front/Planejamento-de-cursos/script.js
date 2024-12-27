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
