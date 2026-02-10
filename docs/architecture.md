# Porpuse of the document

This document describes the architecture of the:  
**Custom fork of [GitHub Readme Streak Stats](https://github.com/denvercoder1/github-readme-streak-stats) optimized for Vercel deployment.**

Its purpose is to:

- Define how the project's code is organized.

- Explain the responsibilities of each folder and layer.

- Serve as a guide for maintaining a clean architecture as the project grows.

- Prevent business logic from being mixed within Vercel endpoints.

- Document the technical decisions made to adapt the original project to Vercel Serverless Functions.

This document is intended for both myself (the fork's author) and anyone who wants to:
- understand how the project works internally,
- contribute changes,
- or deploy and extend their own instance on Vercel.

# Project structure

```mermaid

graph TD
    A[/api/]->B[hello.js]
    A--> C[streak/]
    C--> D[stats.js]

    E[/lib/]-->F[render/]
    F --> G[renderStreakSvg.js]
    F --> H[renderJson.js]

    E --> I[streak/]
    I --> J[calculateStreak.js]
    I --> K[formatStreakResponse.js]

    E --> L[gitHub/]
    L --> M[githubClient.js]
    L --> N[githubQueries.js]

    E --> O[shared/]
    O --> P[errors.js]
    O --> Q[validators.js]

    R[/docs/] --> S[vercel-guide.md]
    R --> U[architecture.md]

```

# Principles of architecture

The chosen architecture responds to specific project needs and limitations inherent to the Vercel environment. Every decision has a clear purpose and avoids problems that would arise later if the architecture weren't properly structured from the start.

### Strict Separation Between Endpoints and Logic
Endpoints in `/api` must be lean because Vercel executes each file as an independent function. Keeping them free of heavy logic prevents duplication, simplifies maintenance, and reduces the risk of errors when adding more routes.

### Logic Independence from the Environment
The streak logic, SVG rendering, and GitHub queries reside in `/lib` so they don't depend on Vercel. This allows them to be tested without a serverless environment and avoids coupling with the platform.

### Modularity and Scalability
Dividing `/lib` into submodules (`github`, `streak`, `render`, `shared`) allows each part to evolve without affecting the others. If a new endpoint or output format is added tomorrow, the architecture is already prepared.

### Component Reuse Functions 
Such as validators, error handling, and streak calculations are used at various points in the project. Having them in separate modules avoids duplication and maintains code consistency.

### Adaptation to Clean Architecture 
The structure reflects Clean Architecture principles applied to a serverless environment:

- **Domain**: pure streak logic
- **Infrastructure**: GitHub queries
- **Presentation**: SVG rendering
- **Interface**: endpoints in `/api`

This separation allows each layer to change without breaking the others.

### Testing Preparation 
By not mixing logic with endpoints, it is possible to test each module in isolation. This facilitates detecting errors, maintaining quality, and preventing regressions as the project grows.

### Clarity for collaborators and users
A documented and modular architecture makes it easier for others to understand how the project works, where to add new features, and how to extend it without breaking anything.

# Execution flow

The **user** accesses their **GitHub profile**, which triggers an **HTTP request** to Vercel through the endpoint **api/streak/stats.js.**
The endpoint receives the request and first validates the input parameters using the validation layer located in **lib/shared/validators.**
Once the data is validated, the endpoint itself acts as an orchestrator: it queries the **GitHub API** using **githubClient** to obtain the necessary information and then sends that data to the **domain layer**, where the **streak statistics** are calculated.
With the statistics processed, the orchestrator decides on the **output** format requested by the user and delegates the generation of the result—either an SVG or a JSON—to the **presentation layer**.
Finally, the endpoint returns the corresponding HTTP response in the chosen format.

# Diagram

```mermaid

flowchart TD

A[HTTP request] --> B[api/streak/stats.js]
B --> C[lib/shared/validators (validation)]
B --> D[githubClient → GitHub]
B --> E[calculateStreak (domain)]
B --> F[presentation layer]
F --> G[renderStreakSvg]
G --> H[HTTP response (SVG)]
F --> I[formatJsonResponse]
I --> J[HTTP response (json)]

```

# Testing

El proyecto parte de un fork, así que no se construye desde cero. Ya existe una base funcional y no tiene sentido aplicar TDD de forma estricta. La estrategia es incremental: cada vez que se añade o modifica una parte importante del sistema, se incorporan tests que garanticen su correcto funcionamiento.
El objetivo no es la cobertura total, sino asegurar que las piezas críticas del proyecto sean fiables, fáciles de entender y compatibles con futuras extensiones.

## Principios/reglas que se aplican

- El código nuevo relevante se testea.
- La capa de dominio es prioritaria porque contiene la lógica central.
- Los tests deben ayudar a que el proyecto sea entendible para cualquier colaborador.
- Se prioriza compatibilidad y mantenibilidad por encima del dogmatismo.

## Qué testear y qué NO 

### Testear

- calculateStreak (núcleo del proyecto)
- validators (entrada del usuario)
- renderStreakSvg (salida visual)
- formato del JSON (salida alternativa)

### No testear

- Runtime de Vercel
- Objetos req / res
- Wiring HTTP
- Deploy o infraestructura
Estas partes dependen del entorno serverless y no aportan valor al test unitario.

## Herramientas de testing

Se utiliza Vitest porque:
- es nativo para proyectos modernos en Node
- requiere muy poca configuración
- es rápido de ejecutar e integrar

## SETUP Vitest

```bash

npm install -D vitest

```

Agregar en el package.json

```json

{
   "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
    }
}

```


# Roadmap

Lista clara de lo que querés implementar más adelante.
Incluye:
- mejoras planificadas
- nuevas features
- optimizaciones
- soporte para más formatos
- mejoras de caching
- internacionalización
- configuraciones avanzadas del SVG
- cualquier idea futura que quieras dejar registrada
Es una sección viva: no describe el presente, sino el futuro del proyecto.

# Technical decisions

Incluye:
- por qué elegiste Vercel
- por qué usás arquitectura limpia
- por qué separaste dominio / infraestructura / presentación
- por qué usás SVG en vez de PNG
- por qué usás GitHub API REST o GraphQL
- por qué elegiste esa estructura de carpetas
- por qué evitás lógica en los endpoints
- por qué no usás frameworks pesados
- cualquier decisión que afecte al diseño del proyecto
La clave es justificar cada decisión con:
- simplicidad
- mantenibilidad
- rendimiento
- claridad
- escalabilidad
