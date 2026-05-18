async function cargarCatalogo() {
  try {
    // Buscamos el archivo generado por n8n
    const res = await fetch('productos.json'); 
    const productos = await res.json();

    const main = document.getElementById('catalogo');
    main.innerHTML = ''; // Limpiamos el contenedor
    
    if (!productos || productos.length === 0) {
      main.innerHTML = '<p class="cargando">No hay productos disponibles.</p>';
      return;
    }

    // Mostrar fecha de actualización
    const fechaEl = document.createElement('p');
    fechaEl.className = 'actualizado';
    fechaEl.textContent = `Última actualización: ${new Date().toLocaleDateString('es-AR')}`;
    main.appendChild(fechaEl);

    const grid = document.createElement('div');
    grid.className = 'grid';

    productos.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      
      // Armamos la ruta hacia tu carpeta local 'images'
      // Si la foto no existe en la carpeta, 'onerror' hace que no se muestre el cuadro roto
      const imagenHTML = p.imagen 
        ? `<img src="images/${p.imagen}" alt="${p.descripcion}" class="producto-img" onerror="this.style.display='none'">` 
        : '';

      card.innerHTML = `
        ${imagenHTML}
        <p class="categoria">${p.categoria || 'General'}</p>
        <h3>${p.descripcion}</h3>
        <div class="precio">$${Number(p.precio_venta).toLocaleString('es-AR')}</div>
      `;
      grid.appendChild(card);
    });

    main.appendChild(grid);

  } catch (error) {
    console.error(error);
    document.getElementById('catalogo').innerHTML = 
      '<p class="cargando">Error al cargar el catálogo. Intentá de nuevo.</p>';
  }
}

// Ejecutamos la función al cargar la página
cargarCatalogo();