import React, { useState } from 'react';
import { Card, Button, Badge } from '../common';
import { motion } from 'framer-motion';

/**
 * Design Customization Panel
 * Allows users to customize app colors and theme
 */

const THEME_PRESETS = [
  {
    id: 'zenvest',
    name: '🚀 Zenvest (Default)',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#0f172a',
      card: '#1e293b',
    },
  },
  {
    id: 'ocean',
    name: '🌊 Ocean Vibes',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#14B8A6',
      background: '#001f3f',
      card: '#0a3d62',
    },
  },
  {
    id: 'sunset',
    name: '🌅 Sunset',
    colors: {
      primary: '#F97316',
      secondary: '#EF4444',
      accent: '#FBBF24',
      background: '#1F1308',
      card: '#291918',
    },
  },
  {
    id: 'forest',
    name: '🌲 Forest',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#6EE7B7',
      background: '#064E3B',
      card: '#047857',
    },
  },
  {
    id: 'midnight',
    name: '🌙 Midnight',
    colors: {
      primary: '#9333EA',
      secondary: '#7C3AED',
      accent: '#A78BFA',
      background: '#1F0E3D',
      card: '#312E81',
    },
  },
  {
    id: 'cherry',
    name: '🍒 Cherry Blossom',
    colors: {
      primary: '#EC4899',
      secondary: '#F472B6',
      accent: '#FBB6CE',
      background: '#3D1428',
      card: '#6B2342',
    },
  },
];

/**
 * Theme Customizer Component
 */
export const ThemeCustomizer = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColors, setCustomColors] = useState(currentTheme?.colors || THEME_PRESETS[0].colors);
  const [showCustom, setShowCustom] = useState(false);

  const handleThemeSelect = (theme) => {
    setCustomColors(theme.colors);
    onThemeChange(theme);
    setShowCustom(false);
  };

  const handleColorChange = (colorKey, value) => {
    const updated = { ...customColors, [colorKey]: value };
    setCustomColors(updated);
    onThemeChange({ ...currentTheme, colors: updated });
  };

  const applyThemeToDOM = (colors) => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  React.useEffect(() => {
    applyThemeToDOM(customColors);
  }, [customColors]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        title="Customize Design"
      >
        🎨
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-16 right-0 w-80"
        >
          <Card className="p-4">
            <h3 className="text-lg font-bold text-text mb-4">🎨 Customize Design</h3>

            {!showCustom ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <p className="text-sm text-text-secondary mb-3">Choose a theme preset:</p>
                {THEME_PRESETS.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme)}
                    className="w-full text-left p-3 rounded-lg border-2 border-dark-border hover:border-primary transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {['primary', 'secondary', 'accent'].map((color) => (
                          <div
                            key={color}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.colors[color] }}
                          />
                        ))}
                      </div>
                      <span className="text-text text-sm">{theme.name}</span>
                    </div>
                  </button>
                ))}

                <button
                  onClick={() => setShowCustom(true)}
                  className="w-full p-3 mt-3 bg-dark-hover rounded-lg text-text text-sm hover:bg-dark-border transition-all"
                >
                  + Create Custom Theme
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setShowCustom(false)}
                  className="text-sm text-primary hover:text-secondary transition-colors"
                >
                  ← Back to Presets
                </button>

                <div className="space-y-3">
                  {Object.entries(customColors).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs text-text-secondary capitalize mb-1 block">
                        {key}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-10 h-10 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="flex-1 px-2 py-1 bg-dark-hover rounded text-xs text-text font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="primary"
                  className="w-full text-sm"
                  onClick={() => handleThemeSelect({ colors: customColors })}
                >
                  Save Theme
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

/**
 * Color Palette Showcase
 * Display current theme colors
 */
export const ColorPalette = ({ colors }) => {
  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4">🎨 Current Theme</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(colors).map(([name, color]) => (
          <div key={name} className="space-y-2">
            <div
              className="w-full h-16 rounded-lg shadow-lg"
              style={{ backgroundColor: color }}
            />
            <p className="text-xs text-text-secondary uppercase tracking-wider">{name}</p>
            <p className="text-sm font-mono text-text">{color}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

/**
 * Design System Help
 */
export const DesignSystemGuide = () => {
  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4">🎨 Design System</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-text mb-2">Color Usage</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>✓ <span className="text-primary font-bold">Primary</span>: Main buttons, highlights</li>
            <li>✓ <span className="text-secondary font-bold">Secondary</span>: Interactive elements</li>
            <li>✓ <span className="text-accent font-bold">Accent</span>: Special emphasis</li>
            <li>✓ <span className="text-text">Text</span>: Main text content</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text mb-2">Component Variants</h4>
          <div className="space-y-2">
            <Button variant="primary" size="sm" className="w-full">
              Primary Button
            </Button>
            <Button variant="secondary" size="sm" className="w-full">
              Secondary Button
            </Button>
            <Button variant="ghost" size="sm" className="w-full">
              Ghost Button
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-text mb-2">Badges</h4>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

/**
 * Export custom theme as CSS
 */
export const exportThemeAsCSS = (colors, themeName = 'custom') => {
  const css = `
/* Zenvest Custom Theme: ${themeName} */
:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-card: ${colors.card};
}

.dark {
  color-scheme: dark;
}
`;

  return css;
};

/**
 * Download theme configuration
 */
export const downloadTheme = (colors, themeName = 'zenvest-theme') => {
  const config = {
    name: themeName,
    colors: colors,
    createdAt: new Date().toISOString(),
  };

  const dataStr = JSON.stringify(config, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${themeName}.json`;
  link.click();
};
