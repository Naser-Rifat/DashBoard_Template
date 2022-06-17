import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdBrightness2, MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";

import { Notification, UserProfile } from ".";
import { useStateContext } from "../Contexts/ContextProvider";
import avatar from "../Data/avatar.jpg";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    setMode,
    currentMode,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <div className="mt-2">
          <input
            type="radio"
            id="light"
            name="theme"
            value="Light"
            onChange={setMode}
            className="cursor-pointer hidden"
            checked={currentMode === "Light"}
          />
          <label htmlFor="light" className="ml-2 text-md cursor-pointer">
            <BsBrightnessHighFill
              color={currentColor}
              className="inline text-xl"
            />
          </label>
        </div>
        <div className="mt-2">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="Dark"
            className="cursor-pointer hidden"
            onChange={setMode}
            checked={currentMode === "Dark"}
          />
          <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
            <MdBrightness2 className="inline text-xl dark:text-gray-100" />
          </label>
        </div>
        {/* <NavButton
          title="Dark/Light mode"
          color={currentColor}
          icon={<ImBrightnessContrast />}
        /> */}
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Rifat
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
