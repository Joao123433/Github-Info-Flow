const users = []

interface UserData {
  id: number
  login: string
  avatar_url: string
  name: string
  bio: string
  public_repos: number
  repos_url: string
  html_url: string
}

interface ReposData {
  name: string
  description: string
  fork: boolean
  stargazers_count: number
  html_url: string
}

function findUser(name: string) {
  return users.find(user => user.login === name)
}

async function fetchUserData(name: string) {
  const response = await fetch(`https://api.github.com/users/${name}`)
  if(response.ok) {
    return response.json()
  }

  return Promise.reject("Not Found")
}

async function getUserData(name: string) {
  try {
    const response: UserData = await fetchUserData(name)
    users.push(response)
  } catch(erro) {
    console.log(erro)
  }
}

async function fetchReposData(url: string) {
  const reponse = await fetch(url)
  
  return reponse.json()
}

async function getReposData(url: string) {
  try {
    const response: ReposData = await fetchReposData(url)
    return response
  } catch(erro) {
    console.log(erro)
  }
}

function showAllUsers() {
  let list = "Lista de usuarios: "
  users.forEach(element => {
    list += `
      Nome: ${element.name}
      Login: ${element.login}
      Quantidade de respositorios ${element.public_repos}
    `
  })

  console.log(list)
}

// funcao principal
async function showInfoUser(name: string) {
  const userExisting = findUser(name)
  if(userExisting) {
    const repos = await getReposData(userExisting.repos_url)
    
    tratamentInfo(userExisting, repos)
  } else {
    console.log(`Usuario ${name} nao esta nos registros`)
  }
}

function tratamentInfo(user, repos) {
  let list = `Informacoes sobre o usuario ${user.name}
    Login: ${user.login}
    Nome: ${user.name}
    Quantidade de respositorios: ${user.public_repos}
  `

  list += `     Alguns Respositorios:`
  
  repos.sort((a: { size: number }, b: { size: number }) => b.size - a.size)
  for(let i = 0; i < 5; i++) {
    list += `
          Nome: ${repos[i].name}
          Descrisao: ${repos[i].description ? repos[i].description : "Sem descrisao"}
          Link: ${repos[i].html_url}
      `
  }
  console.log(list)
}

function calcTotalRepos() {
  const total = users.reduce((acum, { public_repos }) => acum + public_repos, 0)

  console.log(`Total de respotorios de todos os usuarios: ${total}`)
}

function topFiveQuantRepos() {
  const usersDescending = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5)

  let list = `Top 5 usuario com mais repositorios`
  usersDescending.forEach(element => {
    list += `
      Nome: ${element.name}
      Login: ${element.login}
      Quantidade de respositorios ${element.public_repos}
      Link para o perfil: ${element.html_url}
    `
  })

  console.log(list)
}

async function App() {
  await getUserData("Joao123433")
  await getUserData("rafaballerini")
  await getUserData("camilatigre")
  await getUserData("gustavoguanabara")
  await getUserData("Joao123433")

  console.log("--------------------------------------------------------------------------")

  showAllUsers()

  console.log("--------------------------------------------------------------------------")

  await showInfoUser("Joao123433")

  console.log("--------------------------------------------------------------------------")

  await showInfoUser("camilatigre")

  console.log("--------------------------------------------------------------------------")

  calcTotalRepos()

  console.log("--------------------------------------------------------------------------")

  topFiveQuantRepos()
}


App()
// showAllUsers()