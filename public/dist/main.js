var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const users = [];
function findUser(name) {
    return users.find(user => user.login === name);
}
function fetchUserData(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.github.com/users/${name}`);
        if (response.ok) {
            return response.json();
        }
        return Promise.reject("Not Found");
    });
}
function getUserData(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetchUserData(name);
            users.push(response);
        }
        catch (erro) {
            console.log(erro);
        }
    });
}
function fetchReposData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield fetch(url);
        return reponse.json();
    });
}
function getReposData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetchReposData(url);
            return response;
        }
        catch (erro) {
            console.log(erro);
        }
    });
}
function showAllUsers() {
    let list = "Lista de usuarios: ";
    users.forEach(element => {
        list += `
      Nome: ${element.name}
      Login: ${element.login}
      Quantidade de respositorios ${element.public_repos}
    `;
    });
    console.log(list);
}
// funcao principal
function showInfoUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExisting = findUser(name);
        if (userExisting) {
            const repos = yield getReposData(userExisting.repos_url);
            tratamentInfo(userExisting, repos);
        }
        else {
            console.log(`Usuario ${name} nao esta nos registros`);
        }
    });
}
function tratamentInfo(user, repos) {
    let list = `Informacoes sobre o usuario ${user.name}
    Login: ${user.login}
    Nome: ${user.name}
    Quantidade de respositorios: ${user.public_repos}
  `;
    list += `     Alguns Respositorios:`;
    repos.sort((a, b) => b.size - a.size);
    for (let i = 0; i < 5; i++) {
        list += `
          Nome: ${repos[i].name}
          Descrisao: ${repos[i].description ? repos[i].description : "Sem descrisao"}
          Link: ${repos[i].html_url}
      `;
    }
    console.log(list);
}
function calcTotalRepos() {
    const total = users.reduce((acum, { public_repos }) => acum + public_repos, 0);
    console.log(`Total de respotorios de todos os usuarios: ${total}`);
}
function topFiveQuantRepos() {
    const usersDescending = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let list = `Top 5 usuario com mais repositorios`;
    usersDescending.forEach(element => {
        list += `
      Nome: ${element.name}
      Login: ${element.login}
      Quantidade de respositorios ${element.public_repos}
      Link para o perfil: ${element.html_url}
    `;
    });
    console.log(list);
}
function App() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getUserData("Joao123433");
        yield getUserData("rafaballerini");
        yield getUserData("camilatigre");
        yield getUserData("gustavoguanabara");
        yield getUserData("Joao123433");
        console.log("--------------------------------------------------------------------------");
        showAllUsers();
        console.log("--------------------------------------------------------------------------");
        yield showInfoUser("Joao123433");
        console.log("--------------------------------------------------------------------------");
        yield showInfoUser("camilatigre");
        console.log("--------------------------------------------------------------------------");
        calcTotalRepos();
        console.log("--------------------------------------------------------------------------");
        topFiveQuantRepos();
    });
}
App();
// showAllUsers()
