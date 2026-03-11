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
  }
};

return themes[themeName] || themes["dark"];
}