interface Project {
  author: string;
  handle: string;
  websiteUrl: string | null;
  tweetUrl: string;
  votes: number;
  createdAt: string;
  displayName?: string; // Optional display name for repeated entries
  isJudge?: boolean;
  imageUrl?: string;
}

// Add judges at the beginning of the projects array
export const projects: Project[] = [
  {
    author: "Karpathy",
    handle: "karpathy",
    websiteUrl: null,
    tweetUrl: "https://twitter.com/karpathy",
    votes: 0,
    createdAt: "2024-03-25",
    isJudge: true,
    imageUrl: "karp.jpg"
  },
  {
    author: "Tim Soret",
    handle: "timsoret",
    websiteUrl: null,
    tweetUrl: "https://twitter.com/timsoret",
    votes: 0,
    createdAt: "2024-03-25",
    isJudge: true,
    imageUrl: "tims.jpg"
  },
  {
    author: "Mr.doob",
    handle: "mrdoob",
    websiteUrl: null,
    tweetUrl: "https://twitter.com/mrdoob",
    votes: 0,
    createdAt: "2024-03-25",
    isJudge: true,
    imageUrl: "mrdoob.jpg"
  },
  {
    author: "S13K",
    handle: "s13k_",
    websiteUrl: null,
    tweetUrl: "https://twitter.com/s13k_",
    votes: 0,
    createdAt: "2024-03-25",
    isJudge: true,
    imageUrl: "sk.jpg"
  },
  {
    author: "Levels.io",
    handle: "levelsio",
    websiteUrl: null,
    tweetUrl: "https://twitter.com/levelsio",
    votes: 0,
    createdAt: "2024-03-25",
    isJudge: true,
    imageUrl: "levels.jpg"
  },
  // Keep existing projects
  {
    author: "Aurelien",
    handle: "Aurelien_Gz",
    websiteUrl: "http://symphonious-cendol-a42a5a.netlify.app",
    tweetUrl: "https://x.com/Aurelien_Gz/status/1904469274749460858",
    votes: 12,
    createdAt: "2025-03-25 09:43:53+00"
  },
  {
    author: "BRU𝕏LY",
    handle: "Bruxly_",
    websiteUrl: "https://vibejamlevelsio.netlify.app",
    tweetUrl: "https://x.com/Bruxly_/status/1904482741477064751",
    votes: 0,
    createdAt: "2025-03-25 10:37:23+00"
  },
  {
    author: "Chris",
    handle: "codingnuclei",
    websiteUrl: null,
    tweetUrl: "https://x.com/codingnuclei/status/1904449421682631102",
    votes: 7,
    createdAt: "2025-03-25 08:24:59+00"
  }
  // Add more projects as needed
];

export const getProjectUrl = (project: Project): string => {
  return project.websiteUrl || project.tweetUrl;
}; 