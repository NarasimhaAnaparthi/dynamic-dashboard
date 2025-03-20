export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Update this based on your file extensions and structure
  ],
  safelist: [
    {
      pattern: /grid-cols-\d+/,
    },
    {
      pattern: /grid-rows-\d+/,
    },
    {
      pattern: /col-span-\d+/,
    },
    {
      pattern: /row-span-\d+/,
    },
    {
      pattern: /gap-\d+/,
    },
  ],
};
