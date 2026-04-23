let productos = JSON.parse(localStorage.getItem("productos")) || [];

const form = document.getElementById("formProducto");
const tabla = document.getElementById("tablaProductos");

// MOSTRAR PRODUCTOS
function mostrarProductos() {
  tabla.innerHTML = "";

  productos.forEach((producto, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>
          <button onclick="editarProducto(${index})">Editar</button>
          <button onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// GUARDAR PRODUCTO
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;

  productos.push({ nombre, precio });

  localStorage.setItem("productos", JSON.stringify(productos));

  form.reset(); // Limpia el formulario

  mostrarProductos();
});

// ELIMINAR
function eliminarProducto(index) {
  // Si cancela, se detiene
  if (!confirm("¿Seguro que deseas eliminar este producto?")) {
    return;
  }
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}


// EDITAR
function editarProducto(index) {
  const producto = productos[index];

  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;

  eliminarProducto(index);
}

// INICIAR
mostrarProductos();