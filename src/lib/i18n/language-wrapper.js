import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { LANGUAGE, LANGUAGE_EN } from '../constant/common-constant';
import LanguageContext from './language-context';
import messages_en from "./language-source/en.json";
import messages_hi from './language-source/hi.json';
import messages_mr from './language-source/mr.json';

LanguageWrapper.propTypes = {
    children: PropTypes.node
};

function LanguageWrapper({ children }) {
    const defaultLangue = useMemo(() => {
        const lang = (navigator?.language || navigator?.userLanguage)?.substr(0, 2) || LANGUAGE_EN;
        const supportLang = LANGUAGE.find(x => x.code === lang);
        if (!supportLang) {
            alert(`Language ${lang} is not supported. Proceeding in English`);
            return LANGUAGE_EN;
        }
        return lang;
    }, []);

    const [language, setLanguage] = useState(defaultLangue);

    // Getting the language from browser
    const loadMessage = useMemo(() => {
        const messageLoader = {
            en: messages_en,
            hi: messages_hi,
            mr: messages_mr
        };

        const myArray = ['a', 'b', 'c'];
        const map = myArray.reduce((memo, item, index) => {
            memo[item] = index;
            return memo;
        }, {})

        // const x = new Object({});
        // console.log(Object.getPrototypeOf(x));

        var a = 10;
        // var a = 13;
        console.log(map);
        console.log(`Hello ${a}!`);

        // setTimeout(() => {alert(10)}, 10);
        // var x = undefined;
        // console.log(x);
        return messageLoader[language];
    }, [language])

    // const _foo = (err, callback) => {
    //     if (err) {
    //         callback(err);
    //     }
    //     callback();
    // }

    // const a = function () {alert(23);}
    // a();
    //     var x = 10;
    // if (x === x) {
    //     x = 20;
    // }
    return (
        <IntlProvider locale={language} messages={loadMessage}>
            <LanguageContext.Provider value={{ language: language, setLanguage: setLanguage }}>
                {children}
            </LanguageContext.Provider>
        </IntlProvider>
    );
}

export default LanguageWrapper;