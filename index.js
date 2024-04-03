let participantes = [ 
    {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 14, 30),
    dataCheckIn: new Date(2024, 3, 5, 15, 10)
  },
  {
    nome: "Beltrano da Silva",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 3, 8, 10, 15),
    dataCheckIn: new Date(2024, 3, 8, 11, 0)
  },
  {
    nome: "Ciclano Oliveira",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2024, 3, 12, 9, 45),
    dataCheckIn: new Date(2024, 3, 12, 10, 30)
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 3, 15, 16, 20),
    dataCheckIn: new Date(2024, 3, 15, 17, 0)
  },
  {
    nome: "João Pereira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 18, 11, 0),
    dataCheckIn: new Date(2024, 3, 18, 11, 30)
  },
  {
    nome: "Ana Lima",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 3, 22, 14, 45),
    dataCheckIn: new Date(2024, 3, 22, 15, 15)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 26, 10, 10),
    dataCheckIn: new Date(2024, 3, 26, 10, 50)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 3, 30, 13, 20),
    dataCheckIn: new Date(2024, 3, 30, 14, 0)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
//condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

return`
  <tr>
    <td> 
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
`
}
  
const atualizarlista = (participantes) =>{
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  //substituir info html
   document
  .querySelector('tbody')
  .innerHTML = output
  }

atualizarlista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes= [participante, ...participantes]
atualizarlista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}
