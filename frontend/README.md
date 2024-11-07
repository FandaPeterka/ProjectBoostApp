# Dokumentace Frontendu Aplikace

## Obsah
1. [Úvod](#úvod)
2. [Celková Architektura Aplikace](#celková-architektura-aplikace)
3. [Detaily Klíčových Funkcionalit](#detaily-klíčových-funkcionalit)
    - [Autentizace Uživatelů](#autentizace-uživatelů)
    - [Globální Stav Aplikace](#globální-stav-aplikace)
    - [UI Komponenty](#ui-komponenty)
    - [Modal a Drawer Komponenty](#modal-a-drawer-komponenty)
    - [3D Canvas Animace](#3d-canvas-animace)
    - [Styling a Animace](#styling-a-animace)
    - [Responzivita a Media Queries](#responzivita-a-media-queries)
4. [Napojení na Backend](#napojení-na-backend)
5. [Správa Kontextů](#správa-kontextů)
6. [Detailní Přehled Složek a Souborů](#detailní-přehled-složek-a-souborů)

---

## Úvod

Frontend této aplikace je postaven na **Reactu** s použitím knihoven jako **Tailwind CSS** pro stylování a **Framer Motion** pro animace. Hlavní část aplikace je rozdělena do modulárních komponent, které jsou opakovaně použitelné a snadno rozšiřitelné. Aplikace také využívá 3D animace pomocí knihoven `react-three/fiber` a `@react-three/drei`, což dodává interaktivní prvky a zlepšuje uživatelský zážitek.

---

## Celková Architektura Aplikace

Aplikace je rozčleněna do několika klíčových částí:

1. **Autentizační systém** - Registrace a přihlašování uživatelů přes API.
2. **Globální stavová správa** - Pomocí React Context API jsou spravovány informace o uživateli a projektech.
3. **UI Komponenty** - Zahrnuje opakovaně použitelné komponenty jako tlačítka, modální okna, přehrávač hudby, a další.
4. **3D Animace** - Využití 3D modelů k vytvoření dynamického a vizuálně přitažlivého prostředí.
5. **Responzivní design** - Komponenty jsou navrženy tak, aby fungovaly na všech zařízeních, od mobilních telefonů po desktop.

---

## Detaily Klíčových Funkcionalit

### Autentizace Uživatelů

#### `Login.jsx` a `Signup.jsx`

Autentizační komponenty `Login` a `Signup` implementují rozhraní pro přihlášení a registraci uživatelů:
- **Formuláře pro uživatelské údaje** - Každý formulář obsahuje vstupní pole pro email, uživatelské jméno a heslo.
- **Backendové API volání** - Pomocí custom hooku `useSignup` se provádí API volání na backend, kde probíhá ověření uživatele.
- **Validace a přesměrování** - Po úspěšné autentizaci je uživatel přesměrován na domovskou stránku.

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(email, password, username); 
    if (res) {
        navigate('/'); 
    }
};
```

