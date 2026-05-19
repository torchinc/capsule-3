// tweaks.jsx — Tweaks panel for index.html
// Three composable controls that reshape the feel of the design.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "standard",
  "cardMood": "lifted",
  "accent": "#E85A24"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweak values to the document. Density and card mood each compose
  // a bundle of CSS overrides keyed off [data-*] attributes; accent is a
  // single CSS variable that cascades to links, indicator dots, and kickers.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-density', t.density);
  }, [t.density]);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-card-mood', t.cardMood);
  }, [t.cardMood]);
  React.useEffect(() => {
    // The design uses two accent tokens: `--color-accent` (links) and
    // `--color-accent-warm` (kickers, dots, active chips). Drive both from the
    // single tweak so the page reads as one accent identity.
    document.documentElement.style.setProperty('--color-accent', t.accent);
    document.documentElement.style.setProperty('--color-accent-warm', t.accent);
  }, [t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Density / 密度" />
      <TweakRadio
        value={t.density}
        options={[
          { value: 'gallery',  label: 'ギャラリー' },
          { value: 'standard', label: '標準' },
          { value: 'compact',  label: 'コンパクト' },
        ]}
        onChange={(v) => setTweak('density', v)}
      />

      <TweakSection label="Card treatment / カードの質感" />
      <TweakRadio
        value={t.cardMood}
        options={[
          { value: 'lifted',   label: '浮遊' },
          { value: 'flush',    label: '溶け込み' },
          { value: 'outlined', label: '枠取り' },
        ]}
        onChange={(v) => setTweak('cardMood', v)}
      />

      <TweakSection label="Accent identity / アクセント色" />
      <TweakColor
        value={t.accent}
        options={['#E85A24', '#0076FF', '#C8102E', '#1F8A5B', '#111111']}
        onChange={(v) => setTweak('accent', v)}
      />
    </TweaksPanel>
  );
}

const __tweakRoot = ReactDOM.createRoot(document.getElementById('tweaks-root'));
__tweakRoot.render(<TweaksApp />);
