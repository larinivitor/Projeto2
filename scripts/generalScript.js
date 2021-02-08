var db = firebase.firestore();
var logged = false;

function createUser(event) {
    event.preventDefault();
    email = document.getElementById("email").value;
    password = document.getElementById("password1").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            console.log("Usuario criado com sucesso");
            document.getElementById("message").innerText = "Usuario criado com sucesso";
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            document.getElementById("errorMessage").innerText = errorMessage;
        })
}

function authenticateUser(event) {
    event.preventDefault();
    email = document.getElementById("email2").value;
    password = document.getElementById("password2").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            console.log("Usuario logado com sucesso");
            if(email == "poderpublico@gmail.com"){
                window.location.replace("./poderPublicoIndex.html");
            } else {
                window.location.replace("./indexLogged.html");
            }
        }).catch(function (error) {
            console.log("Usuario não encontrado");
            let errorMessage = "Usuário não encontrado"
            document.getElementById("errorMessage").innerText = errorMessage;
        })
}

function signOutUser(event) {

    event.preventDefault();

        firebase.auth().signOut().then(() => {
            console.log("Deslogado com sucesso");
            window.location.replace("./index2.html");
          }).catch((error) => {
            let errorMessage = error.message
            console.log(errorMessage);
            
          });
}

function verifyAuthentication(event) {
    var user = firebase.auth().currentUser;
    event.preventDefault();
    console.log(user);
    console.log(user.email);
}

function sendEmailResetPassword(event) {
    var auth = firebase.auth();
    var user = firebase.auth().currentUser;
    var emailAddress = user.email;
    event.preventDefault();
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        console.log("Email enviado");
        document.getElementById("message").innerText = "Email enviado";
    }).catch(function (error) {
        console.log("Usuario não encontrado");
        let errorMessage = error.message;
        document.getElementById("errorMessage").innerText = errorMessage;
    });
}

function forgotPassword(event) {
    var auth = firebase.auth();
    event.preventDefault();
    var emailAddress = document.getElementById("email2").value;

    if(emailAddress != ""){

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            console.log("Email enviado");
            document.getElementById("message").innerText = "Email enviado";
        }).catch(function (error) {
            console.log("Usuario não encontrado");
            let errorMessage = error.message;
            document.getElementById("errorMessage").innerText = errorMessage;
        });
    }
    else{
        document.getElementById("errorMessage").innerText = "Por favor insira um e-mail válido";
    }
    

}

function updatePassword(event){
    event.preventDefault();
    var user = firebase.auth().currentUser;

    if (user) {

        var newPassword = document.getElementById("newPassword").value;

        user.updatePassword(newPassword).then(function() {
            document.getElementById("message").innerText = "Alterado com sucesso";
        }).catch(function(error) {
            document.getElementById("errorMessage").innerText = errorMessage;
        });

    }else{
        console.log("Deu erro no if")
    }
}

function deleteUser(event) {
    var user = firebase.auth().currentUser;
    event.preventDefault();
    user.delete().then(function () {
        console.log("Usuario deletado");
        document.getElementById("message").innerText = "User deletado";
    }).catch(function (error) {
        console.log("Usuario não encontrado");
        let errorMessage = error.message;
        document.getElementById("errorMessage").innerText = errorMessage;
    });
}


function includeCard(event) {

    local = document.getElementById("local").value;
    descricao = document.getElementById("descricao").value;
    img = document.getElementById("imgLink").value;
    event.preventDefault();imgLink

    db.collection("ocorrencias").add({
        descricao: descricao,
        local: local,
        situacao: "Cadastrado",
        foto: img,
        usuario: firebase.auth().currentUser.email
    })
        .then(function () {
            console.log("Document successfully written!");
            window.location.replace("./indexLogged.html");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

function updateCard(event) {

    id = document.getElementById("cardId").value;
    local = document.getElementById("localEdit").value;
    descricao = document.getElementById("descricaoEdit").value;
    link = document.getElementById("imgLinkEdit").value;
    situacao = document.getElementById("situacao").value;
    user = document.getElementById("userEmail").value;

    event.preventDefault();

    var card = db.collection("ocorrencias").doc(id);

    card.set({
        descricao: descricao,
        local: local,
        situacao: situacao,
        foto: link,
        usuario: user
    })
        .then(function () {
            window.location.replace("./indexLogged.html");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

function updateCardPublico(event) {

    var e = document.getElementById("selectSituation");
    var situacaoText=e.options[e.selectedIndex].text;//get the selected option text

    id = document.getElementById("cardIdPublico").value;
    local = document.getElementById("localEditPublico").value;
    descricao = document.getElementById("descricaoEditPublico").value;
    link = document.getElementById("imgLinkEditPublico").value;
    user = document.getElementById("userEmail").value;

    event.preventDefault();

    var card = db.collection("ocorrencias").doc(id);

    card.set({
        descricao: descricao,
        local: local,
        situacao: situacaoText,
        foto: link,
        usuario: user
    })
        .then(function () {
            window.location.replace("./poderPublicoIndex.html");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

function deleteCard(id) {


    db.collection("ocorrencias").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        window.location.replace("./myindexLogged.html");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}