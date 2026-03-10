async function cargarCatalogo() {
  try {
    const res = await fetch('precios.json');
    const productos = await res.json();

    const main = document.getElementById('catalogo');
    
    if (!productos || productos.length === 0) {
      main.innerHTML = '<p class="cargando">No hay productos disponibles.</p>';
      return;
    }

    // Fecha de actualización
    const fechaEl = document.createElement('p');
    fechaEl.className = 'actualizado';
    fechaEl.textContent = `Última actualización: ${new Date().toLocaleDateString('es-AR')}`;
    main.appendChild(fechaEl);

    // Grid de productos
    const grid = document.createElement('div');
    grid.className = 'grid';

    productos.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <p class="categoria">${p.categoria || 'General'}</p>
        <h3>${p.descripcion}</h3>
        <div class="precio">$${Number(p.precio_venta).toLocaleString('es-AR')}</div>
      `;
      grid.appendChild(card);
    });

    main.appendChild(grid);

  } catch (error) {
    document.getElementById('catalogo').innerHTML = 
      '<p class="cargando">Error al cargar el catálogo. Intentá de nuevo.</p>';
  }
}

cargarCatalogo();
