import './App.css'
import type {ChangeEventHandler} from "react";
import {useCallback} from "react";
import i18n from "./i18n";
import {useTranslation} from "react-i18next";

function App() {
    const {t} = useTranslation()
    const {changeLanguage} = i18n

    const onLangChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        console.log(e.target.value)
        changeLanguage(e.target.value, () => {
            console.log('eee')
        }).catch(console.error)
    }, [changeLanguage, t])

    return (
        <main className="app">
            <div className="container">
                <h1>Example</h1>
                <h2>{t("example")}</h2>
                <h3>{t("my.nested.example")}</h3>
                <select onChange={onLangChange}>
                    <option value={"en"}>EN</option>
                    <option value={"pl"}>PL</option>
                    <option value={"de"}>DE</option>
                    <option value={"fr"}>FR</option>
                </select>
            </div>
        </main>
    )
}

export default App
