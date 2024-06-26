import React, {FC, createContext, useContext} from 'react'

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'

const  initLang=window.navigator.language.substring(0,2).toString();
type Props = {
  selectedLang: 'de' | 'en' | 'es' | 'fr' | 'ja' | 'zh';
}
const initialState: Props = {
  selectedLang:  'zh',
}

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY)||`"${initLang}"`;
  if (ls) {
    try {
      return JSON.parse(ls) as Props
    } catch (er) {
      console.error(er)
    }
  }
  return JSON.parse(ls) as Props ||initialState
}
export const nowLang=getConfig().selectedLang||initialState.selectedLang;
// Side effect
export function setLanguage(lang: string) {
  function judeLang(lang:string){
    switch(lang){
      case 'zh':case'cn':case'zh-TW':case'zh-CN':
        return "zh";
        default: return "en";
    }
  }
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang:judeLang(lang) }))
  window.location.reload()
}

const I18nContext = createContext<Props>(initialState)

const useLang = () => {
  return useContext(I18nContext).selectedLang||initLang
}

const MetronicI18nProvider: FC = ({children}:any) => {
  const lang = getConfig()
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>
}

export {MetronicI18nProvider, useLang}
