import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo";
import { Burger } from "../../assets";
import { useState } from "react";
import NavItems from "./NavItems";

export default function NavBar() {
    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const toggleBurger = () => setIsBurgerOpen((prev) => !prev);

    return (
        <div className="mb-25">
            <div className="fixed top-0 left-0 px-10 flex items-center justify-between w-screen h-17 border-b border-b-white/20 bg-dark-bg/95 z-100">
                <div className="flex gap-5">
                    <NavLink to="/" className="flex items-center gap-4">
                        <Logo />
                        <span className="font-bold text-xl">MaybeLearn</span>
                    </NavLink>
                </div>
                <div className="hidden sm:block">
                    <ul className="flex items-center gap-9">
                        <NavItems
                            w={21}
                            h={10}
                            firstText="text-base"
                            secondText="text-base"
                        />
                    </ul>
                </div>
                <div
                    className="sm:hidden bg-button-background/45 rounded-sm p-1 z-1"
                    onClick={toggleBurger}
                >
                    <Burger />
                </div>
                {isBurgerOpen && (
                    <div
                        className="flex flex-col fixed top-0 left-0 w-screen h-screen items-center justify-center gap-9 bg-dark-bg/50"
                        onClick={toggleBurger}
                    >
                        <NavItems
                            w={30}
                            h={12}
                            firstText="text-3xl"
                            secondText="text-2xl"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
