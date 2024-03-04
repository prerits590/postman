import { FC } from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ setIsDark }) => {
  const handleThemeToggle = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };
  return (
    <div className="theme-toggle-container">
      <label className="ui-switch">
        <input onChange={handleThemeToggle} type="checkbox" />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
