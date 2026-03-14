export function getTheme(themeName) {

const themes = {
  dark: {
    bg: "#0d1117",
    border: "#30363d",
    text: "#c9d1d9",
    accent1: "#58a6ff",
    accent2: "#3fb950",
    accent3: "#f78166"
  },
  light: {
    bg: "#ffffff",
    border: "#e1e4e8",
    text: "#24292e",
    accent1: "#0969da",
    accent2: "#1a7f37",
    accent3: "#cf222e"
  },
  dracula: {
    bg: "#282a36",
    border: "#44475a",
    text: "#f8f8f2",
    accent1: "#bd93f9",
    accent2: "#50fa7b",
    accent3: "#ff5555"
  },
  nord: {
    bg: "#2e3440",
    border: "#4c566a",
    text: "#eceff4",
    accent1: "#81a1c1",
    accent2: "#a3be8c",
    accent3: "#bf616a"
  },
  tokyo: {
  bg: "#1a1b26",
  border: "#24283b",
  text: "#c0caf5",
  accent1: "#7aa2f7", 
  accent2: "#9ece6a", 
  accent3: "#f7768e"  
  },
  solarized_light: {
  bg: "#fdf6e3",
  border: "#eee8d5",
  text: "#657b83",
  accent1: "#268bd2", 
  accent2: "#859900", 
  accent3: "#dc322f"  
  },
  solarized_dark: {
  bg: "#002b36",
  border: "#073642",
  text: "#93a1a1",
  accent1: "#268bd2", 
  accent2: "#859900", 
  accent3: "#dc322f"  
  },
  monokai: {
  bg: "#272822",
  border: "#3e3d32",
  text: "#f8f8f2",
  accent1: "#66d9ef", 
  accent2: "#a6e22e", 
  accent3: "#f92672"  
  },
  gruvbox_dark: {
  bg: "#282828",
  border: "#3c3836",
  text: "#ebdbb2",
  accent1: "#83a598", 
  accent2: "#b8bb26", 
  accent3: "#fb4934"  
  },
  gruvbox_light: {
  bg: "#fbf1c7",
  border: "#ebdbb2",
  text: "#3c3836",
  accent1: "#458588", 
  accent2: "#98971a", 
  accent3: "#cc241d"  
  },
  catppuccin_latte: {
  bg: "#eff1f5",
  border: "#ccd0da",
  text: "#4c4f69",
  accent1: "#1e66f5", 
  accent2: "#40a02b", 
  accent3: "#d20f39"  
  },
  catppuccin_frappe: {
  bg: "#303446",
  border: "#414559",
  text: "#c6d0f5",
  accent1: "#8caaee", 
  accent2: "#a6d189", 
  accent3: "#e78284"  
  },
  catppuccin_macchiato: {
  bg: "#24273a",
  border: "#363a4f",
  text: "#cad3f5",
  accent1: "#8aadf4", 
  accent2: "#a6da95", 
  accent3: "#ed8796"  
  },
  catppuccin_mocha: {
  bg: "#1e1e2e",
  border: "#313244",
  text: "#cdd6f4",
  accent1: "#89b4fa", 
  accent2: "#a6e3a1", 
  accent3: "#f38ba8"  
  },
  one_dark_pro: {
  bg: "#282c34",
  border: "#3a3f4b",
  text: "#abb2bf",
  accent1: "#61afef", 
  accent2: "#98c379", 
  accent3: "#e06c75"  
  }

};

return themes[themeName] || themes["dark"];
}