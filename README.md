# Cypress Test: Validación de PIN y Embarques

Este proyecto automatiza un flujo completo de validación para:
- Acceso con PIN
- Filtro por embarque
- Validación de datos correctos
- Manejo de errores (PIN incorrecto y embarque no encontrado)

## 📦 Instalación
```bash
npm install
```

## ▶️ Ejecutar pruebas y grabar video
```bash
npx cypress run --spec "cypress/e2e/embarque.cy.js"
```

Se guardará un video de la ejecución en `cypress/videos/`.

## 📊 Generar reporte visual con Mochawesome
```bash
npm run report
```

El reporte estará en `cypress/reports/final/mochawesome.html`

## 📁 Estructura del proyecto
- `cypress/e2e/embarque.cy.js`: prueba principal con validaciones y errores
- `cypress/fixtures/datos.json`: datos como PIN y embarque
- `package.json`: dependencias
- `cypress.config.js`: configuración de Cypress + Mochawesome
- `README.md`: instrucciones completas# cypress_embarque_completo_reportes
<<<<<<< HEAD
<<<<<<< HEAD
# Cambios nuevos
=======
>>>>>>> c0b1147 (first commit)
=======
# Cambios nuevos
>>>>>>> 3e28d95 (Agrego cambios de prueba)
