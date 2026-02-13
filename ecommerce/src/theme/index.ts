// ============================================
// THÈME CHAKRA UI - SIMPLIFIÉ
// ============================================
// Ce fichier définit les couleurs et polices de ton site
// Basé sur ta maquette Figma : noir, blanc, gris

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      // ----------------------------------------
      // COULEURS (exactement celles de ta maquette Figma)
      // ----------------------------------------
      colors: {
        // Couleurs principales
        brand: {
          white: { value: "#FFFFFF" },      // Blanc pur
          offWhite: { value: "#FAFAFA" },   // Blanc cassé (fonds)
          beige: { value: "#E5E4DF" },      // Beige/gris clair
          gray: { value: "#404040" },       // Gris foncé
          black: { value: "#000000" },      // Noir pur
          accent: { value: "#8A38F5" },     // Violet (liens, accents)
        },
      },

      // ----------------------------------------
      // POLICES (Bebas Neue pour titres, Inter pour texte)
      // ----------------------------------------
      fonts: {
        heading: { value: "'Bebas Neue', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
  },
})

// Création du système de thème
export const system = createSystem(defaultConfig, config)
