import { cloneElement } from "react";
import { classNames } from "engine/utils";

import { Card, Tappable, AspectRatio } from "@vkontakte/vkui";

import "./PhotoCard.css";
import { Icon24LikeOutline, Icon24Like } from "@vkontakte/icons";

interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  activated?: boolean;
  isDesktop?: boolean;
  url: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  activated,
  isDesktop,
  url,
  onClick,
  className,
  ...restProps
}) => {
  const icon = activated ? <Icon24Like /> : <Icon24LikeOutline />;

  return (
    <Card
      {...restProps}
      className={classNames(
        "PhotoCard",
        isDesktop ? "PhotoCard--desktop" : "",
        className
      )}
      mode="shadow"
    >
      <Tappable
        className="PhotoCard__icon"
        activeMode="PhotoCard__icon--active-opacity"
        hoverMode="PhotoCard__icon--hovered-opacity"
        onClick={onClick}
      >
        {cloneElement(icon, {
          style: {
            width: isDesktop ? 24 : 16,
            height: isDesktop ? 24 : 16,
          },
        })}
      </Tappable>
      <Tappable
        className="PhotoCard__content"
        activeMode="PhotoCard__content--active-opacity"
        hoverMode="PhotoCard__content--hovered-opacity"
        href={url}
        target="_blank"
      >
        <AspectRatio className="PhotoCard__image" ratio={1 / 1}>
          <img alt="" src={url} />
        </AspectRatio>
      </Tappable>
    </Card>
  );
};

export default PhotoCard;
