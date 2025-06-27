// cypress/e2e/embarque.cy.js

describe('Flujo de autenticación y filtrado de embarque', () => {
  let testData;

  before(() => {
    cy.fixture('datos.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit(testData.baseUrl);
    // Agregamos una espera corta para que la UI de PIN se renderice completamente si es muy rápida
    // cy.wait(500);
  });

  // --- Caso Positivo: Autenticación exitosa y búsqueda de embarque ---
  it('Debe autenticarse con PIN válido y filtrar un embarque existente correctamente', () => {
    cy.log('Paso 1: Acceder a la URL (gestionado por beforeEach)');

    cy.log(`Paso 2: Ingresar PIN válido: ${testData.pin}`);
    // *** CORRECCIÓN CLAVE para las 4 cajas de PIN ***
    // Inspecciona el HTML y reemplaza 'input.pin-digit-input' por el selector real
    // que apunte a TODAS las cajas de PIN. Podría ser una clase, o un tipo de input único.
    const pinDigits = testData.pin.split(''); // Divide el PIN en dígitos individuales
    cy.get('input[formcontrolname^="digit"]') // Selector actualizado para inputs de PIN
      .should('have.length', 4) // Asegúrate de que encontramos 4 campos
      .each(($el, index) => {
        cy.wrap($el).type(pinDigits[index]); // Escribe cada dígito en su campo
      });
    
    cy.contains('Ingresar').click(); // Vi en el video que el botón es 'Ingresar', no 'Aceptar'
    cy.wait(2000);
    cy.screenshot('despues-de-login');

    // Asegúrate de que 'Embarques' sea visible después del login
    cy.contains('Embarques').should('be.visible', { timeout: 10000 });

    cy.log('Autenticación exitosa.');

    // 3. Filtrado de Embarque
    cy.log('Paso 3: Iniciar proceso de filtrado de embarque');
    // Asegúrate que el botón de filtros tenga este texto o un selector real.
    cy.contains('Filtros').click();
    cy.wait(2000);
    cy.screenshot('despues-de-filtros');
    
    // Asegúrate que el buscador maestro tenga este texto o un selector real.
 cy.contains('Buscador Maestro', { timeout: 10000 }).click();    cy.wait(2000);
    cy.screenshot('despues-de-buscador-maestro');
    
    // Asegúrate que la opción "Embarque" tenga este texto o un selector real.
    cy.contains('Embarque').click();

    cy.log(`Ingresar número de embarque: ${testData.embarque}`);
    // Asegúrate que el campo de búsqueda de embarque tenga este placeholder o selector real.
    cy.get('input[placeholder="Buscar"]').type(testData.embarque);
    
    // Asegúrate que el botón de buscar tenga este texto o un selector real.
    cy.contains('Buscar').click();

    // Esperar a que los resultados se carguen y sean visibles
    // Reemplaza '.Tabla-embarques' con el selector real de la tabla o contenedor de resultados.
    cy.get('.Tabla-embarques', { timeout: 10000 }).should('be.visible');

    // 4. Validación de Datos
    cy.log('Paso 4: Validar que los detalles del embarque coincidan');
    cy.get('.Tabla-embarques').should('contain', testData.embarque);
  });

  // --- Caso Negativo: PIN incorrecto ---
  it('Debe mostrar un mensaje de error al ingresar un PIN incorrecto', () => {
    cy.log(`Intentando autenticación con PIN incorrecto: '1234'`);
    // *** CORRECCIÓN CLAVE para las 4 cajas de PIN ***
    const invalidPinDigits = '1234'.split('');
    cy.get('input[formcontrolname^="digit"]') // Selector actualizado para inputs de PIN
      .should('have.length', 4)
      .each(($el, index) => {
        cy.wrap($el).type(invalidPinDigits[index]);
      });
    
    cy.contains('Ingresar').click(); // Botón 'Ingresar'
    cy.wait(2000);
    cy.screenshot('despues-de-login-pin-incorrecto');

    // Aserción de error: verificar que el mensaje de error es visible y contiene el texto esperado
    cy.contains('pin incorrecto', { matchCase: false, timeout: 15000 }).should('be.visible');
    cy.log('Mensaje de error para PIN incorrecto visible.');
  });

  // --- Caso Negativo: Embarque no encontrado ---
  it('Debe mostrar un mensaje de "no resultados" al buscar un embarque inexistente', () => {
    cy.log('Paso 1: Autenticarse para buscar embarque inexistente');
    // *** CORRECCIÓN CLAVE para las 4 cajas de PIN ***
    const pinDigits = testData.pin.split('');
    cy.get('input[formcontrolname^="digit"]') // Selector actualizado para inputs de PIN
      .should('have.length', 4)
      .each(($el, index) => {
        cy.wrap($el).type(pinDigits[index]);
      });
    cy.contains('Ingresar').click(); // Botón 'Ingresar'
    cy.wait(2000);
    cy.screenshot('despues-de-login-busqueda-inexistente');
    cy.contains('Embarques').should('be.visible');

    cy.log('Paso 2: Iniciar proceso de filtrado con embarque inexistente');
    cy.contains('Filtros').click();
    cy.wait(2000);
    cy.screenshot('despues-de-filtros-busqueda-inexistente');
cy.contains('Buscador Maestro', { timeout: 10000 }).click();    cy.wait(2000);
    cy.screenshot('despues-de-buscador-maestro-busqueda-inexistente');
    cy.contains('Embarque').click();

    cy.log(`Ingresar número de embarque inexistente: 'NoExiste123'`);
    cy.get('input[placeholder="Buscar"]').type('NoExiste123');
    cy.contains('Buscar').click();

    // Asegúrate que el mensaje de "no resultados" tenga este texto o un selector real.
    cy.contains('Sin resultados').should('be.visible');
    cy.log('Mensaje de "no resultados" para embarque inexistente visible.');
  });
});