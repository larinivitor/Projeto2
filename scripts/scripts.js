$(document).on("click", ".edit-button", function(){

  var id = $(this).attr("data-id");
  $("#cardId").val(id);

  var local = $(this).parent().find(".data-local").text();
  $("#localEdit").val(local);

  var description = $(this).parent().find(".data-description").text();
  $("#descricaoEdit").val(description);

  var situacao = $(this).parent().find(".data-situation").text();
  $("#situacao").val(situacao);

  var link = document.getElementsByClassName("data-imgLink")[0].value;
  $("#imgLinkEdit").val(link);

  var user = document.getElementsByClassName("data-user")[0].value;
  $("#userEmail").val(user);

});


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
              <input type="hidden" class="data-imgLink" value="${doc.data().foto}"></input>
              <input type="hidden" class="data-user" value="${doc.data().usuario}"></input>
              <img class="card-img-top data-imgLink" src="${doc.data().foto}">
                <div class="card-body">
                <div>Local:</div>
                <p class="card-text data-local">${doc.data().local}</p>
                <div>Descricao:</div>
                <p class="card-text data-description">${doc.data().descricao}</p>
                <div>Situacao:</div>
                <p class="card-text data-situation">${doc.data().situacao}</p>
                  <button type="button" class="btn btn-sm btn-outline-secondary edit-button" id="editButton" data-id='${doc.id}' data-toggle="modal" data-target="#editModal">Edit</button>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
               
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;

            container.innerHTML += content;
        });
    });

}


loadcontent();
