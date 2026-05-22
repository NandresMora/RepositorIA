import type { Tool } from '../types/tool';

export const tools: Tool[] = [
  // LLM & RAZONAMIENTO
  {
    id: 'claude',
    name: 'Claude.ai',
    description: 'Ideal para análisis profundo de código y redacción técnica. Úsalo cuando necesites razonamiento lógico superior y manejo de contextos extensos sin errores.',
    url: 'https://claude.ai/',
    pillar: 'Work',
    category: 'LLM',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Integración nativa con el ecosistema Google. Úsalo para procesar múltiples formatos (video/audio/texto) simultáneamente gracias a su ventana de contexto masiva.',
    url: 'https://gemini.google.com/',
    pillar: 'Work',
    category: 'LLM',
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'IA con acceso a datos en tiempo real de X. Úsala cuando necesites investigar tendencias actuales o eventos que están ocurriendo en el momento exacto.',
    url: 'https://x.ai/',
    pillar: 'Work',
    category: 'LLM',
  },

  // CODING & IA AGENTS
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Modelo de código abierto optimizado para desarrollo. Úsalo como alternativa costo-eficiente para tareas de codificación pura y razonamiento matemático complejo.',
    url: 'https://deepseek.com/',
    pillar: 'Work',
    category: 'Coding',
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    description: 'StackBlitz impulsado por IA. Úsalo para prototipar aplicaciones Fullstack completas en el navegador desde un prompt, con despliegue instantáneo.',
    url: 'https://bolt.new/',
    pillar: 'Work',
    category: 'Coding',
  },
  {
    id: 'trae',
    name: 'Trae',
    description: 'IDE de IA adaptativo de ByteDance. Úsalo cuando busques una experiencia de desarrollo fluida que aprenda de tu estilo de programación local.',
    url: 'https://www.trae.sh/',
    pillar: 'Work',
    category: 'Coding',
  },
  {
    id: 'lovable',
    name: 'Lovable',
    description: 'Ingeniero de software GPT-4o. Úsalo para construir y enviar aplicaciones web de alta calidad visual y funcional a partir de lenguaje natural.',
    url: 'https://lovable.dev/',
    pillar: 'Work',
    category: 'Coding',
  },

  // DEVOPS & INFRASTRUCTURE
  {
    id: 'postgres-sandbox',
    name: 'Postgres Sandbox',
    description: 'Instancias efímeras de base de datos. Úsalo para testing rápido de esquemas o validación de queries SQL sin ensuciar tus entornos locales o de dev.',
    url: 'https://postgresandbox.com/',
    pillar: 'Work',
    category: 'DevOps',
  },
  {
    id: 'google-idx',
    name: 'Project IDX',
    description: 'Entorno de desarrollo multi-plataforma basado en la nube. Úsalo para configurar workspaces consistentes con emuladores de Android/iOS integrados.',
    url: 'https://idx.google.com/',
    pillar: 'Work',
    category: 'Cloud Infrastructure',
  },
  {
    id: 'railway',
    name: 'Railway',
    description: 'Infraestructura simplificada. Úsalo cuando necesites desplegar microservicios o bases de datos con configuración cero y escalado automático.',
    url: 'https://railway.app/',
    pillar: 'Work',
    category: 'Cloud Infrastructure',
  },

  // AUTOMATION & APIS
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Automatización basada en nodos auto-hospedable. Úsalo para orquestar flujos de datos complejos que requieren privacidad y lógica técnica avanzada.',
    url: 'https://n8n.io/',
    pillar: 'Work',
    category: 'Automation',
  },
  {
    id: 'make',
    name: 'Make',
    description: 'Interfaz visual para integraciones. Úsalo para conectar APIs de forma rápida y visual cuando la velocidad de entrega sea más crítica que el código puro.',
    url: 'https://make.com/',
    pillar: 'Work',
    category: 'Automation',
  },

  // DIAGRAMS & IDEATION
  {
    id: 'rapidchart',
    name: 'RapidChart',
    description: 'Generación de diagramas técnicos con IA. Úsalo para documentar arquitecturas de sistemas y flujos de datos en segundos a partir de texto.',
    url: 'https://rapidchart.io/',
    pillar: 'Work',
    category: 'Diagrams',
  },
  {
    id: 'xmind',
    name: 'Xmind',
    description: 'Mapas mentales para estructurar ideas. Úsalo durante la fase de descubrimiento del proyecto para organizar requisitos y jerarquías de información.',
    url: 'https://xmind.app/',
    pillar: 'Work',
    category: 'Diagrams',
  },

  // DESIGN & ASSETS
  {
    id: 'tailorbrands',
    name: 'Tailor Brands',
    description: 'Branding automatizado. Úsalo para generar identidades visuales completas y logotipos para tus proyectos personales o MVPs en minutos.',
    url: 'https://tailorbrands.com/',
    pillar: 'Business',
    category: 'Design',
  },
  {
    id: 'ideogram',
    name: 'Ideogram AI',
    description: 'Generador de imágenes con tipografía perfecta. Úsalo para crear pósters, banners o assets de UI donde el texto sea el elemento central.',
    url: 'https://ideogram.ai/',
    pillar: 'Business',
    category: 'Image Generation',
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: 'Biblioteca de imágenes de alta resolución. Úsalo para encontrar fotografía profesional gratuita que eleve la estética de tus landing pages.',
    url: 'https://unsplash.com/',
    pillar: 'Business',
    category: 'Asset Generation',
  },
  {
    id: 'pexels',
    name: 'Pexels',
    description: 'Stock de video e imagen gratuito. Úsalo para obtener recursos multimedia de fondo (hero videos) con licencias permisivas para proyectos web.',
    url: 'https://pexels.com/',
    pillar: 'Business',
    category: 'Asset Generation',
  },

  // RESEARCH & ACADEMIC
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Buscador con IA y fuentes citadas. Úsalo para fact-checking técnico y para obtener respuestas rápidas con referencias reales de la web.',
    url: 'https://perplexity.ai/',
    pillar: 'Study',
    category: 'Research',
  },
  {
    id: 'futurepedia',
    name: 'Futurepedia',
    description: 'Directorio de herramientas IA. Úsalo para mantenerte actualizado sobre las últimas innovaciones y encontrar soluciones específicas a problemas nuevos.',
    url: 'https://futurepedia.io/',
    pillar: 'Study',
    category: 'Research',
  },
  {
    id: 'codedex',
    name: 'Codedex',
    description: 'Plataforma de aprendizaje gamificada. Úsala cuando necesites aprender un nuevo lenguaje o framework de forma interactiva y estructurada.',
    url: 'https://codedex.io/',
    pillar: 'Study',
    category: 'Academic',
  },

  // MULTIMEDIA IA
  {
    id: 'fliki',
    name: 'Fliki',
    description: 'Conversión de texto a video con voces realistas. Úsalo para crear contenido multimedia rápido para redes sociales o tutoriales de producto.',
    url: 'https://fliki.ai/',
    pillar: 'Business',
    category: 'Audio/Video',
  }
];
