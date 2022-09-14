import i18n from "./i18n";
import type {ChangeEventHandler} from "react";
import {useCallback} from "react";

export const ChangeLanguage = () => {
    const {t, changeLanguage} = i18n

    const onLangChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        changeLanguage(e.target.value).catch(console.error)
    }, [changeLanguage, t])
    return (
        <select onChange={onLangChange}>
            <option value={"en"}>EN</option>
            <option value={"pl"}>PL</option>
            <option value={"de"}>DE</option>
            <option value={"fr"}>FR</option>
        </select>
    )
}