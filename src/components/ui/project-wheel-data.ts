interface Project {
  name: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: "Fly Pieter",
    url: "https://fly.pieter.com/"
  },
  {
    name: "Vibe Skater",
    url: "https://vibeskater.themodernspellbook.com"
  },
  {
    name: "Astro Adventure",
    url: "https://astro.gobienan.com"
  },
  {
    name: "The Vibe Metaverse",
    url: "https://thevibemetaverse.com"
  },
  {
    name: "Glider Sim",
    url: "https://glider-sim.com"
  }
];

// Helper function to get project URL
export const getProjectUrl = (projectName: string): string => {
  const project = projects.find(p => p.name === projectName);
  return project?.url || '#';
};

// Helper function to get expanded projects array for the wheel
export const getExpandedProjects = (): Project[] => {
  const minSlots = 72; // Minimum number of slots for the wheel
  const repeatedProjects = Array.from({ length: Math.ceil(minSlots / projects.length) })
    .flatMap(() => projects)
    .slice(0, minSlots)
    .map((project, index) => ({
      ...project,
      name: project.name + (index >= projects.length ? ` ${Math.floor(index / projects.length) + 1}` : '')
    }));
  return repeatedProjects;
}; 