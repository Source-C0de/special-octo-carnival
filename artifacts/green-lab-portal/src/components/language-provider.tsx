import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  dir: "ltr" | "rtl";
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  dir: "ltr",
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "green-lab-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("lang", language);
    root.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    
    // Add RTL class for tailwind
    if (language === "ar") {
      root.classList.add("rtl");
    } else {
      root.classList.remove("rtl");
    }
  }, [language]);

  const value = {
    language,
    setLanguage: (lang: Language) => {
      localStorage.setItem(storageKey, lang);
      setLanguage(lang);
    },
    dir: language === "ar" ? "rtl" : "ltr",
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
