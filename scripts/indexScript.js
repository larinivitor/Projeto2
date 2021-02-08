function loadcontent() {

    db.collection("ocorrencias").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            console.log(doc.id, " => ", doc.data());

            const card = document.createElement('div');
            const container = document.getElementById('accordion');
            card.classList = 'card-body';

            const content = `
            <div class="col-md-4">
            <div class="card mb-4 box-shadow">
            <img class="card-img-top data-imgLink" src="${doc.data().foto}">
              <div class="card-body">
                <div>Local:</div>
                <p class="card-text data-local">${doc.data().local}</p>
                <div>Descricao:</div>
                <p class="card-text data-description">${doc.data().descricao}</p>
                <div>Situacao:</div>
                <p class="card-text data-situation">${doc.data().situacao}</p>
              </div>
            </div>
          </div>
            `;

            container.innerHTML += content;
        });
    });

}


loadcontent();

