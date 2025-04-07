import styles from "./PopUpMenu.module.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface MenuItemType {
  label: string;
  icon?: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  buttonClassName?: string;
  menuClassName?: string;
  menuItems: MenuItemType[];
  buttonContent: React.ReactNode;
}

const PopUpMenu: React.FC<DropdownMenuProps> = ({
  menuItems,
  buttonContent,
}) => {
  return (
    <Menu>
      <MenuButton className="ml-auto scale-[0.9] transition-all ease-in-out border border-accent-grey-100 rounded-[0.5rem] flex items-center justify-center bg-background hover:scale-[1] hover:cursor-pointer hover:shadow-md active:shadow-none active:inset-shadow-md data-active:scale-[1] data-active:shadow-none data-active:inset-shadow-md">
        {buttonContent}
      </MenuButton>
      <MenuItems
        className="mt-[0.8rem] w-[10rem] p-[0.5rem] rounded-[0.5rem] border border-accent-grey-100 bg-background flex flex-col gap-[0.3rem]"
        anchor="top end"
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <div className={styles["menu-item-wrap"]} onClick={item.onClick}>
              <button className="border-none bg-background font-medium text-[0.8rem] p-[0.2rem]">
                {item.label}
              </button>
              {item.icon ? <img src={item.icon} alt={item.label} /> : ""}
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default PopUpMenu;
