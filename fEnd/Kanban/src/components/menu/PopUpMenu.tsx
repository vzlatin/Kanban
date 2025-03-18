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
  buttonClassName = "",
  menuClassName = "",
  menuItems,
  buttonContent,
}) => {
  return (
    <Menu>
      <MenuButton className={buttonClassName}>
        {buttonContent}
      </MenuButton>
      <MenuItems className={menuClassName} anchor="top end">
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <div className={styles["menu-item-wrap"]}>
              <button onClick={item.onClick}>
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
