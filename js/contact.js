window.addEventListener('load',function(){
    let nom;let mail;let text
    document.getElementById("frmSub").addEventListener("click", function(event){
        event.preventDefault()
        nom = document.querySelector('#frmNom').value;
        mail = document.querySelector('#frmMyl').value;
        text = document.querySelector('#frmTxt').value;
        console.log(nom)
        console.log(mail)
        console.log(text)
        notifyMe(nom,mail,text);
    });
    function notifyMe(nom,mail,text) {
        // Vérifions si le navigateur prend en charge les notifications
        if (!('Notification' in window)) {
          alert('Ce navigateur ne prend pas en charge la notification de bureau')
        }      
        // Vérifions si les autorisations de notification ont déjà été accordées
        else if (Notification.permission === 'granted') {
          // Si tout va bien, créons une notification
        //   const notification = new Notification(`${nom}, votre message à été envoyé`,{body:`${text}`,icon:"/img/fav.ico"})
        navigator.serviceWorker.ready.then(function(r){
            r.showNotification(`${nom}, votre message à été envoyé`,{body:`${text}`,icon:"/img/fav.ico"})
        })
        }      
        // Sinon, nous devons demander la permission à l'utilisateur
        else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            // Si l'utilisateur accepte, créons une notification
            if (permission === 'granted') {
                // const notification = new Notification(`${nom}, votre message à été envoyé`,{body:`→ ${text}`,icon:"/img/fav.ico"})
                navigator.serviceWorker.ready.then(function(r){
                    r.showNotification(`${nom}, votre message à été envoyé`,{body:`${text}`,icon:"/img/fav.ico"})
                })
            }
          })
        }      
        // Enfin, si l'utilisateur a refusé les notifications, et que vous
        // voulez être respectueux, il n'est plus nécessaire de les déranger.
      }

})

