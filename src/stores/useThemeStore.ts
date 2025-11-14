import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface ITheme {
    theme: "light" | "dark"
    switchTheme: () => void;
}

const useThemeStore = create<ITheme>()(
    immer(persist((set, get) => ({
        theme: 'dark',
        switchTheme: () => {
            set({theme: `${get().theme === 'dark' ? 'light' : 'dark'}`}, false)
        },
    }), {name: 'themeStorage'}))
)

export const useTheme = () => useThemeStore((s) => s.theme);
export const switchTheme = () => useThemeStore.getState().switchTheme();