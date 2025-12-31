import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <label
      className="relative h-8 w-12 cursor-pointer select-none [-webkit-tap-highlight-color:_transparent]"
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="peer sr-only"
      />

      {/* Track */}
      <span className="absolute inset-0 m-auto h-2 rounded-full bg-[var(--border)]"></span>

      {/* Thumb */}
      <span
        className="absolute inset-y-0 start-0 m-auto size-6 rounded-full 
        bg-[var(--card)] transition-all duration-300
        peer-checked:start-6"
      >
        <span
          className="absolute inset-0 m-auto size-4 rounded-full 
          bg-[var(--accent)] transition"
        />
      </span>
    </label>
  );
}
