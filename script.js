const ul = document.querySelector('ul');

function getGitHubAPI() {

    fetch('https://api.github.com/users/hebertpxx/repos')
        .then(async res => {

            if(!res.ok){
                throw new Error(res.status);
            }
            
            var data = await res.json();
            
            data.map(item => {
                console.log(item);
                let li = document.createElement('li');
                
                item.visibility == 'public' ? item.visibility = 'Pública' : item.visibility = 'Privada';

                li.innerHTML = `
                    <strong>${item.name.toUpperCase()}</strong>
                    <span><b>Descrição:</b> ${item.description}</span>
                    <span><b>Visibilidade:</b> ${item.visibility}</span>
                    <span><b>URL:</b> <a href="${item.html_url}" target="_blank">${item.html_url}</a></span>
                    <span><b>Data Criação:</b>
                        ${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}
                    <span>
                `;

                ul.appendChild(li);

            });

        }).catch(e => console.log(e));
}

getGitHubAPI();