const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                            <p>Seguidores: ${user.followers}</p>
                                            <p>Seguindo: ${user.following}</p>
                                        </div>
                                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br>
                                                                <span class="forks">🍴: ${repo.forks_count}</span>
                                                                <span class="stars">⭐: ${repo.stargazers_count}</span>
                                                                <span class="watchers">👀: ${repo.watchers}</span>
                                                                <span class="language">💻: ${repo.language ?? ''}</span></a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositories</h2>
                                            <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItems = ''
        user.events.forEach(ev => {
            if (ev.type === 'PushEvent') {
                eventsItems += `<li><b>${ev.repo.name}</b> &nbsp; - ${ev.payload.commits[0].message}</li>`
            } else if (ev.type === 'CreateEvent') {
                eventsItems += `<li><b>${ev.repo.name}</b> &nbsp;- Não possui commits</li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos Recentes</h2><br><hr />
                                                 <ul>${eventsItems}</ul><hr />
                                            </div>`
        } else {
            this.userProfile.innerHTML += `<div class="events section"><h2>Não tem Eventos</h2></div>`

        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }

}

export { screen }