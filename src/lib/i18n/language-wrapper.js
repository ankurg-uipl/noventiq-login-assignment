import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LanguageContext from './language-context';
import { LANGUAGE_EN } from '../constant/common-constant';
import { IntlProvider } from 'react-intl';
import messages_en from './language-source/en.json';
import messages_hi from './language-source/hi.json';
import messages_mr from './language-source/mr.json';

LanguageWrapper.propTypes = {
    children: PropTypes.node
};

function LanguageWrapper({ children }) {
    const defaultLangue = useMemo(() => (navigator?.language || navigator?.userLanguage)?.substr(0, 2) || LANGUAGE_EN, []);

    const [language, setLanguage] = useState(defaultLangue);

    const loadMessage = useMemo(() => {
        const messageLoader = {
            en: messages_en,
            hi: messages_hi,
            mr: messages_mr
        };
        return messageLoader[language];
    }, [language])

    return (
        <IntlProvider locale={language} messages={loadMessage}>
            <LanguageContext.Provider value={{ language: language, setLanguage: setLanguage }}>
                {children}
            </LanguageContext.Provider>
        </IntlProvider>
    );
}

export default LanguageWrapper;