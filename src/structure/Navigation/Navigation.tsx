import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { DEFAULT_VIEW } from "engine/state";

import { Spacing, Tabbar, TabbarItem } from "@vkontakte/vkui";
import { Icon28HomeOutline, Icon28FavoriteOutline } from "@vkontakte/icons";

import { CustomCell } from "./fragments";

import "./Navigation.css";

export enum navigationMode {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

interface INavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: navigationMode.DESKTOP | navigationMode.MOBILE;
}

const Navigation: React.FC<INavigationProps> = ({
  mode = navigationMode.DESKTOP,
  className,
  ...restProps
}) => {
  const routeNavigator = useRouteNavigator();
  const { view: activeView = DEFAULT_VIEW.auth } = useActiveVkuiLocation();

  switch (mode) {
    case navigationMode.DESKTOP:
      return (
        <div {...restProps} className={classNames("Navigation", className)}>
          <CustomCell
            before={Icon28HomeOutline}
            id="view-search"
            open={activeView === "view-search"}
            setOpen={() => routeNavigator.replace("/")}
            title="Все котики"
          />
          <Spacing size={4} />
          <CustomCell
            before={Icon28FavoriteOutline}
            id="view-favorite"
            open={activeView === "view-favorite"}
            setOpen={() => routeNavigator.replace("/favorite")}
            title="Любимые"
          />
        </div>
      );
    case navigationMode.MOBILE:
      return (
        <Tabbar>
          <TabbarItem
            onClick={() => routeNavigator.replace("/")}
            selected={activeView === "view-search"}
            data-story="search"
            text="Все котики"
          >
            <Icon28HomeOutline />
          </TabbarItem>
          <TabbarItem
            onClick={() => routeNavigator.replace("/favorite")}
            selected={activeView === "view-favorite"}
            data-story="favorite"
            text="Любимые"
          >
            <Icon28FavoriteOutline />
          </TabbarItem>
        </Tabbar>
      );
    default:
      return <></>;
  }
};

export default Navigation;
