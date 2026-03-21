import type { Tool } from '../types/tool';

export const tools: Tool[] = [
  // Versionado y Colaboración
  {
    id: 'git-gh',
    name: 'GitHub',
    description: 'Control de versiones, repositorios públicos/privados y el Student Developer Pack.',
    url: 'https://github.com/',
    category: 'DevOps',
   
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Plataforma completa de DevOps con CI/CD gratuito, gestión de issues y registro de contenedores.',
    url: 'https://gitlab.com/',
    category: 'DevOps',
  },

  // Frontend y Assets
  {
    id: 'pexels',
    name: 'Pexels',
    description: 'Imágenes y videos de stock gratuitos con licencia CC0 y API para desarrolladores.',
    url: 'https://pexels.com/',
    category: 'Design',
  },
  {
    id: 'pixabay',
    name: 'Pixabay',
    description: 'Comunidad vibrante de creativos que comparten imágenes, ilustraciones y vectores sin copyright.',
    url: 'https://pixabay.com/',
    category: 'Design',
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: 'La fuente de imágenes de alta resolución más utilizada por desarrolladores y diseñadores.',
    url: 'https://unsplash.com/',
    category: 'Design',
  },
  {
    id: 'tailorbrands',
    name: 'Tailor Brands',
    description: 'Plataforma impulsada por IA para crear logotipos, sitios web y activos de marca rápidamente.',
    url: 'https://tailorbrands.com/',
    category: 'Design',
  },
  {
    id: 'ideogram',
    name: 'Ideogram AI',
    description: 'Generador de imágenes por IA especializado en renderizar texto tipográfico con precisión.',
    url: 'https://ideogram.ai/',
    category: 'Image Generation',
  },

  // Backend y Automatización
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Entorno de ejecución para JavaScript construido con el motor de Chrome V8.',
    url: 'https://nodejs.org/',
    category: 'Coding',
   
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Herramienta de automatización de flujos de trabajo auto-hospedable con un enfoque en nodos.',
    url: 'https://n8n.io/',
    category: 'Automation',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Líder en automatización no-code que conecta miles de aplicaciones y servicios.',
    url: 'https://zapier.com/',
    category: 'Automation',
  },
  {
    id: 'postgres-sandbox',
    name: 'Postgres Sandbox',
    description: 'Entorno de pruebas gratuito para bases de datos PostgreSQL, ideal para testing rápido.',
    url: 'https://postgresandbox.com/',
    category: 'Cloud/Deploy',
  },

  // Testing y APIs
  {
    id: 'postman',
    name: 'Postman',
    description: 'La plataforma estándar para el desarrollo, prueba y documentación de APIs.',
    url: 'https://postman.com/',
    category: 'Testing/APIs',
  
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Framework para pruebas end-to-end rápidas, confiables y capaces en navegadores modernos.',
    url: 'https://playwright.dev/',
    category: 'Testing/APIs',
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    description: 'Biblioteca de Node.js que proporciona una API de alto nivel para controlar Chrome/Chromium.',
    url: 'https://pptr.dev/',
    category: 'Testing/APIs',
  },

  // Diagramas y Flujos
  {
    id: 'rapidchart',
    name: 'RapidChart',
    description: 'Generador de diagramas y flujos de trabajo impulsado por IA para arquitecturas IT.',
    url: 'https://rapidchart.io/',
    category: 'Diagrams',
  },
  {
    id: 'mermaid',
    name: 'Mermaid Live Editor',
    description: 'Editor en línea para crear diagramas de flujo, secuencia y Gantt a partir de texto.',
    url: 'https://mermaid.live/',
    category: 'Diagrams',
   
  },

  // IA y Productividad
  {
    id: 'claude',
    name: 'Claude.ai',
    description: 'Asistente de IA avanzado de Anthropic, ideal para análisis de código y redacción técnica.',
    url: 'https://claude.ai/',
    category: 'LLM',
    
  },
  {
    id: 'futurepedia',
    name: 'Futurepedia',
    description: 'El directorio de herramientas de IA más grande, actualizado diariamente con nuevas utilidades.',
    url: 'https://futurepedia.io/',
    category: 'Research',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Modelos de IA de código abierto optimizados para tareas de razonamiento y codificación.',
    url: 'https://deepseek.com/',
    category: 'Coding',
  },
  {
    id: 'codex',
    name: 'Codex AI',
    description: 'Plataforma enfocada en asistentes de IA para mejorar la velocidad de desarrollo.',
    url: 'https://codex.ai/',
    category: 'Coding',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'IA multimodal de Google capaz de procesar texto, código, audio, imagen y video.',
    url: 'https://gemini.google.com/',
    category: 'LLM',
   
  },

  // Deploy y Cloud
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'La plataforma preferida para desplegar aplicaciones Frontend con enfoque en Next.js y React.',
    url: 'https://vercel.com/',
    category: 'Cloud/Deploy',
   
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Plataforma integral para desplegar sitios web estáticos y funciones serverless de forma rápida.',
    url: 'https://netlify.com/',
    category: 'Cloud/Deploy',
  },
  {
    id: 'railway',
    name: 'Railway',
    description: 'Infraestructura en la nube que simplifica el despliegue de bases de datos y servicios backend.',
    url: 'https://railway.app/',
    category: 'Cloud/Deploy',
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Plataforma para desarrollar, enviar y ejecutar aplicaciones dentro de contenedores.',
    url: 'https://docker.com/',
    category: 'DevOps',
  }
];
