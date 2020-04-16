class Autentication{

    constructor(){
        firebase.auth().signOut();
        $('#controles').hide();
        $('#login').show();
        $('#registro').hide();
    }
    
    autEmailPass (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then( result => {
            $('#controles').show();
            $('#login').hide();
            $('#registro').hide();
          })
          .catch(error => {
            this.creaMensaje('danger', 'Usuario o Contraseña Incorrectos!', $('#avisos'));
          });
    }

    crearCuentaEmailPass (email, password, nombres) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then( result => {
              //primero al crear el registro solo se almacena el correo y la contraseña, con lo siguiente
              //actualiza el nombre por l que se envía
                result.user.updateProfile({
                    displayName: nombres
                });

                //Para redirigir después del registro hay que espeficicar la URL de la aplicación
                //esta URL debe ser la misma que se tiene en manifest.json
                const configuracion = { url: 'https://proyecto-utt-1e787.web.app/' };
    
                //manda un correo para verificación
                result.user.sendEmailVerification(configuracion).catch( error => console.error(error) );
            
                //Cierra la sesión para iniciar desde el login
                firebase.auth().signOut();
                    
                //manda mensaje
                this.creaMensaje('warning','Te enviamos un correo, debes verificar', $('#avisosR') );

                setTimeout(() => {
                    $('#controles').hide();
                    $('#login').show();
                    $('#registro').hide();    

                }, 3000);
                
          })
          .catch( error => {
              //En caso de haber un error como datos vacíos o un correo incorrecto nos manda el error
              console.error(error);
              this.creaMensaje('danger', 'Datos Incorrectos',$('#avisosR'));
            })
    }

    creaMensaje(tipo, texto, objeto){
        const mensaje = `<div class="col alert alert-${tipo}" role="alert">
                        ${texto}
                    </div>`;
        objeto.html(mensaje);
        setTimeout(() => {
            objeto.html('');
        }, 3000);
    }
}