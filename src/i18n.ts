import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./translation/de.json";
import en from "./translation/en.json";
import fr from "./translation/fr.json";
import pl from "./translation/pl.json";

i18next.use(initReactI18next).init({
    lng: 'pl',
    resources: {
        de: {
            translation: de
        },
        en: {
            translation: en
        },
        fr: {
            translation: fr
        },
        pl: {
            translation: pl
        }
    }
}).catch(console.error)

export default i18next