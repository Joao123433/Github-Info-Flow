# Aplicativo de Informações de Usuários do GitHub
- Este script busca e exibe informações sobre usuários e seus repositórios no GitHub. Ele utiliza a API do GitHub para coletar detalhes do usuário e dados do repositório.

## Funcionalidades
- `Recuperação de Dados do Usuário:` Busca dados do usuário, como login, nome, URL do avatar, biografia, contagem de repositórios públicos, entre outros.
- `Recuperação de Dados do Repositório:` Obtém informações sobre os repositórios de um usuário, incluindo nome, descrição, contagem de estrelas e URL.
- `Busca de Usuário:` Permite procurar por um usuário específico nos dados armazenados.

## Estrutura
- `showAllUsers:` Exibe uma lista de todos os usuários, juntamente com seus nomes, logins e o número de repositórios públicos.
- `showInfoUser:` Exibe informações detalhadas sobre um usuário específico, incluindo seus principais repositórios.
- `calcTotalRepos:` Calcula e exibe o número total de repositórios entre todos os usuários.
- `topFiveQuantRepos:` Lista os cinco principais usuários com o maior número de repositórios públicos.