$( () => {

    //Se crea una instancia de la clase Autentication, 
    //para hacer uso de sus métodos
    const objAuth = new Autentication();

    //Al dar click en el botón Entrar hace lo siguiente
    $('#btnEntrar').click((e)=>{
        e.preventDefault(); //previene el envío del form
        //Se obtiene el valor de los inputs
        const email = $('#email').val();
        const pass = $('#pass').val();
        //Manda a llamar el método autEmailPass para que firebase gestione el inicio
        objAuth.autEmailPass(email, pass);
        //Limpia los inputs
        $('#email').val('');
        $('#pass').val('');
      });

    //Al dar click en el botón Registro hace lo siguiente
    $('#btnRegistro').click((e) => {
        e.preventDefault();
        //Obtiene valores de los inputs
        const nombres = $('#nombresR').val();
        const emailR = $('#emailR').val();
        const passR = $('#passR').val();
        //manda los valores al método que crea el registro
        objAuth.crearCuentaEmailPass(emailR, passR, nombres);
        //limpia los inputs del formulario
        $('#nombresR').val('');
        $('#emailR').val('');
        $('#passR').val('');
    });

    //Al precionar el botón registrar muestra el formulario de registro
    $('#btnReg').click((e) => {
        e.preventDefault();
        $('#controles').hide();
        $('#login').hide();
        $('#registro').show();
    });

    //Al precionar el botón Cancelar, regresa al formulario de login
    $('#btnCan').click((e) => {
        e.preventDefault();
        $('#controles').hide();
        $('#login').show();
        $('#registro').hide();
    });
})