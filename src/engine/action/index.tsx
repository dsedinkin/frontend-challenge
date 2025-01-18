import { setter } from "elum-state/react";
import { SNACKBAR } from "engine/state";

import { CustomSnackbar } from "engine/components";

export const setSnackbar = (message: any) => {
  setter(
    SNACKBAR,
    <CustomSnackbar
      text={message?.text}
      appearance={message?.is_error ? "negative" : "positive"}
      onClose={() => setter(SNACKBAR, undefined)}
    />
  );
};

export const copyText = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setSnackbar({
        is_error: false,
        text: "Скопировано",
      });
    })
    .catch(() => {
      setSnackbar({
        is_error: true,
        text: "Не удалось скопировать",
      });
    });
};

export const storage = {
  get: (key: string) => {
    try {
      return localStorage?.getItem(key);
    } catch {
      console.error(`storage get key: ${key}`);
      return "";
    }
  },
  set: (key: string, value: string) => {
    try {
      localStorage?.setItem(key, value);
      return;
    } catch {
      console.error(`storage set key: ${key}, value: ${value}`);
      return;
    }
  },
};

export const getFavorites = () => {
  const favorites = storage.get("FAVORITES");
  let response = [];
  try {
    response = JSON.parse(favorites || "[]") || [];
  } catch {
    response = [];
  }
  return response;
};

export const isFavorites = (id: string) => {
  const idString = String(id);
  const prevState = getFavorites();
  const index = prevState?.findIndex(
    (value: any) => String(value?.id) === idString
  );
  return index !== -1;
};

export const setFavorites = (value: Record<string, any>) => {
  const idString = String(value?.id);
  let prevState = getFavorites();
  const index = prevState?.findIndex(
    (value: any) => String(value?.id) === idString
  );
  if (index !== -1) {
    prevState = prevState.filter((value: any) => value?.id !== idString);
    setSnackbar({
      is_error: false,
      text: "Удалено из избранного",
    });
  } else {
    prevState.push(value);
    setSnackbar({
      is_error: false,
      text: "Добавлено в избранное",
    });
  }
  storage.set("FAVORITES", JSON.stringify(prevState));
};
