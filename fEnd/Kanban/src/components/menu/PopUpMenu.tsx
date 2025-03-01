import styles from "./PopUpMenu.module.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface MenuItemType {
  label: string;
  icon?: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  buttonClassName?: string; // Style for button
  menuClassName?: string; // Style for menu items container
  menuItems: MenuItemType[];
  buttonContent: React.ReactNode; // Button content (icon, text, etc.)
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
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
              <img src={item.icon} alt={item.label} />
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
