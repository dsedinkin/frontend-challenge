import {} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Title, Avatar } from "@vkontakte/vkui";

import {} from "@vkontakte/icons";

import "./Header.css";

interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<IHeaderProps> = ({ className, ...restProps }) => {
  return (
    <div {...restProps} className={classNames("Header", className)}>
      <div className="Header__content">
        <Title>
        Кошачий Pinterest
        </Title>
        <Avatar size={32} src="" />
      </div>
    </div>
  );
};

export default Header;
