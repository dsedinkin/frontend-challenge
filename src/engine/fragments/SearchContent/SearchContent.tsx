import { useRef, createRef, useEffect, useMemo, useState } from "react";
import { getFavorites, isFavorites, setFavorites } from "engine/action";
import api from "engine/api";
import { classNames } from "engine/utils";

import { Placeholder, CardGrid } from "@vkontakte/vkui";
import { ContentLoading, PhotoCard } from "engine/components";

import { Icon56FavoriteOutline } from "@vkontakte/icons";

// import "./SearchContent.css";

interface ISearchContentProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "search" | "favorites";
  modeDesktop?: boolean;
  scrollTop: () => void;
}

const SearchContent: React.FC<ISearchContentProps> = ({
  mode = "search",
  modeDesktop,
  scrollTop,
  className,
  ...restProps
}) => {
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const favorites = getFavorites();

  const handleRefresh = () => {
    setError(false);
    setLoading(true);
    const params = new URLSearchParams([
      ["page", "1"],
      ["limit", "10"],
    ]).toString();
    api
      .search(params)
      .then((resp) => {
        setResponse(resp || {});
      })
      .catch((error) => {
        console.log({ error });
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        scrollTop();
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const refs = useRef([]);

  const list = useMemo(
    () =>
      Array.isArray(response) || mode === "favorites" ? (
        <CardGrid>
          {((mode === "favorites" ? favorites : response) as Array<any>)?.map(
            (value, key) => {
              const id = value?.id || 0;
              const url = value?.url || "";

              refs.current[key] = refs?.current?.[key] || createRef();

              return (
                <PhotoCard
                  key={`PhotoCard--${key}`}
                  activated={isFavorites(id)}
                  isDesktop={modeDesktop}
                  url={url}
                  onClick={() => {
                    setFavorites(value);
                  }}
                />
              );
            }
          )}
        </CardGrid>
      ) : (
        <></>
      ),
    [favorites, response]
  );

  return (
    <div {...restProps} className={classNames("Content Group", className)}>
      {mode === "favorites" && favorites?.length === 0 ? (
        <div
          className={`Group__content${
            !modeDesktop ? " Group__content--mobile" : ""
          }`}
        >
          <Placeholder
            header="Пока не добавлено"
            icon={
              <Icon56FavoriteOutline color="var(--vkui--color_text_secondary)" />
            }
            stretched
          />
        </div>
      ) : (
        <ContentLoading
          loading={loading && mode !== "favorites"}
          error={error}
          onRefresh={handleRefresh}
        >
          <div
            className={`Group__content${
              !modeDesktop ? " Group__content--mobile" : ""
            }`}
          >
            {list}
          </div>
        </ContentLoading>
      )}
    </div>
  );
};

export default SearchContent;
