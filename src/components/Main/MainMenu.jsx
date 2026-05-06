import { Banner } from "./Banner";
import { MainMenuLeft } from "./MainMenuLeft";
import { MainMenuRight } from "./MainMenuRight";
import './style.scss'

export const MainMenu = () => {
  return (
    <div className="main-container">
      <div className="main-menu">
        <MainMenuLeft />
        <MainMenuRight/>
      </div>
      <Banner/>
    </div>
  );
};
