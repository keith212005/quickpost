function useThemeToggle() {
  return {
    mounted: false,
    theme: 'light',
    toggleTheme: () => {},
  };
}

export { useThemeToggle };
