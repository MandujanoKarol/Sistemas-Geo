const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');
const datosdelacuenta = document.querySelector('.datosdelacuenta');


const configurarMenu = (user) =>  {

    if(user){

        db.collection('usuarios').doc(user.uid).get().then( doc =>{

            //Se muestra la información de mi cuenta (cuenta logueada)
            const html = `
                <p>Nombre: ${ doc.data().nombre } </p>
                <p>Correo: ${ user.email } </p>
                <p>Teléfono: ${ doc.data().telefono } </p>
                <p>Dirección: ${ doc.data().direccion } </p>
            
            `;

            datosdelacuenta.innerHTML = html;


        });
        listaloggedin.forEach( item => item.style.display = 'block' ); //desplegar elementos
        listaloggedout.forEach( item => item.style.display = 'none' ); //ocultar elementos
    }else{
        listaloggedin.forEach( item => item.style.display = 'none' );
        listaloggedout.forEach( item => item.style.display = 'block' );
    }

};


const listadeplatillos = document.getElementById('listadeplatillos');

const obtienePlatillos = (data) => {

    if(data.length){

        let html = '';

        data.forEach( doc => {

            const platillo = doc.data();

            const columna = `
                <div class="col-12 col-md-4">
                    <img src="imagenes/${ platillo.imagen }" alt="${ platillo.nombre }">
                    <p>${ platillo.nombre }</p>
                    <p class="text-danger">$ ${ platillo.precio }</p>
                    <a href="https://www.paypal.me/grupohernandezalba/${ platillo.precio }" target="_blank">
                        <button class="btn btn-primary" style="margin-bottom:20px">Pagar Ahora</button>
                    </a>
                </div>
            `;

            html += columna;

        });

        listadeplatillos.innerHTML = html;
    }
    else{
        listadeplatillos.innerHTML = '<p class="text-center"> Ingrese con sus claves para ver los platillos disponibles.</p>'
    }

};