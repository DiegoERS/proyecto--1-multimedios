cerrarModal();
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

// Cierra el menú móvil al hacer clic en un enlace
document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("show");
  });
});

// Cierra el menú móvil si se hace clic fuera
document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu");
  const burger = document.querySelector(".hamburguesa");

  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove("show");
  }
});


const ingredientes = {
  masa: {
    titulo: "2 kg de masa de maíz",
    descripcion: "El alma del tamal, suave y húmeda, elaborada con maíz cocido y molido artesanalmente."
  },
  manteca: {
    titulo: "500 g de manteca de cerdo",
    descripcion: "Aporta sabor profundo y textura cremosa a la masa tradicional."
  },
  caldo: {
    titulo: "1 litro de caldo de pollo o cerdo",
    descripcion: "Base líquida rica en sabor que hidrata y nutre la mezcla del tamal."
  },
  achiote: {
    titulo: "1 cucharada de achiote en pasta",
    descripcion: "Color y aroma tradicionales que evocan la cocina autóctona costarricense."
  },
  cebolla: {
    titulo: "2 cebollas medianas finamente picadas",
    descripcion: "Un sofrito base que equilibra dulzor y profundidad en el guiso."
  },
  ajo: {
    titulo: "4 dientes de ajo machacados",
    descripcion: "Toque aromático fundamental que potencia todos los sabores."
  },
  chile: {
    titulo: "1 chile dulce rojo finamente picado",
    descripcion: "Aporta frescura, color y una dulzura natural sutil."
  },
  culantro: {
    titulo: "1 rollo de culantro de coyote picado",
    descripcion: "Hierba autóctona con aroma intenso, sello del sabor turrialbeño."
  },
  carnecerdo: {
    titulo: "500 g de carne de cerdo en trozos pequeños",
    descripcion: "Jugosa, tierna y sazonada, corazón del relleno."
  },
  queso: {
    titulo: "300 g de queso Turrialba semi-maduro",
    descripcion: "Delicado y lácteo, se funde suavemente aportando identidad local."
  },
  arroz: {
    titulo: "250 g de arroz precocido",
    descripcion: "Complemento suave y absorbente que equilibra la textura general."
  },
  garbanzos: {
    titulo: "150 g de garbanzos cocidos",
    descripcion: "Toque rústico y nutritivo que aporta firmeza al bocado."
  },
  zanahoria: {
    titulo: "100 g de zanahoria en cubitos",
    descripcion: "Color y dulzura natural que enriquecen el perfil del relleno."
  },
  papa: {
    titulo: "100 g de papa en cubitos",
    descripcion: "Suavidad terrosa y ligereza para un equilibrio perfecto."
  },
  salpimienta: {
    titulo: "Sal y pimienta al gusto",
    descripcion: "Esenciales para realzar y armonizar cada sabor."
  },
  hojas: {
    titulo: "Hojas de plátano soasadas",
    descripcion: "Envoltorio ancestral que aporta aroma y tradición."
  },
  pabilo: {
    titulo: "Pabilo o mecate para amarrar",
    descripcion: "El toque final para asegurar y dar forma al tamal turrialbeño."
  }
};

function mostrarModal(clave) {
  const ingrediente = ingredientes[clave];
  if (ingrediente) {
    document.getElementById("modal-texto").innerHTML = `
      <h3>${ingrediente.titulo}</h3>
      <p>${ingrediente.descripcion}</p>
    `;
    document.getElementById("modal").style.display = "flex";
  }
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}


  document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('main section[id]');
    const enlacesNav = document.querySelectorAll('nav a');

    function activarLinkEnScroll() {
      let scrollY = window.pageYOffset;

      secciones.forEach(seccion => {
        const seccionTop = seccion.offsetTop - 230; // Ajusta el desplazamiento según el tamaño del encabezado
        const seccionAltura = seccion.offsetHeight;
        const seccionId = seccion.getAttribute('id');

        if (scrollY >= seccionTop && scrollY < seccionTop + seccionAltura) {
          enlacesNav.forEach(link => {
            link.classList.remove('activo');
            if (link.getAttribute('href') === '#' + seccionId) {
              link.classList.add('activo');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', activarLinkEnScroll);
    activarLinkEnScroll(); // Llamada inicial
  });


async function guardarLead(event) {
  // Prevenir que el formulario recargue la página
  event.preventDefault();
  
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  
  // Mostrar el spinner mientras se procesa la solicitud
  Swal.fire({
    title: 'Enviando...',
    text: 'Por favor espera mientras procesamos tu suscripción',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
    backdrop: true
  });
  
  try {
    const response = await fetch('https://elmichi-fdbdbxfdameec6cp.mexicocentral-01.azurewebsites.net/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: nombre,
        Email: email
      })
    });
    
    // Cerrar el spinner de carga
    Swal.close();
    
    if (response.ok) {
      const resultado = await response.json();
      console.log('Lead enviado exitosamente:', resultado);
      
      // Mostrar mensaje de éxito
      Swal.fire({
        title: '¡Suscripción exitosa!',
        text: `Gracias por suscribirte, ${nombre}!`,
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#3085d6'
      });
      
      // Limpiar el formulario
      document.getElementById("nombre").value = '';
      document.getElementById("email").value = '';
      
      return resultado;
    } else {
      console.error('Error al enviar lead:', response.status);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo completar la suscripción. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d33'
      });
      throw new Error(`Error al enviar lead: ${response.status}`);
    }
  } catch (error) {
    // Asegurarse de cerrar el spinner en caso de error
    Swal.close();
    
    console.error('Error en la solicitud:', error);
    Swal.fire({
      title: 'Error de conexión',
      text: 'No se pudo conectar al servidor. Por favor, verifica tu conexión e intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#d33'
    });
    throw error;
  }
}
