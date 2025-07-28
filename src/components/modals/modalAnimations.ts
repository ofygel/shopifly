// src/components/modals/modalAnimations.ts
import { Variants } from 'framer-motion'

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
}

export const modalVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 300,
      duration: 0.3
    } 
  },
  exit: { y: 50, opacity: 0 }
}

export const slideInVariants: Variants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { 
      type: "spring", 
      damping: 30, 
      stiffness: 300,
      duration: 0.4
    } 
  },
  exit: { x: '100%' }
}

export const mobileMenuVariants: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 30, 
      stiffness: 300,
      duration: 0.4
    } 
  },
  exit: { y: '-100%', opacity: 0 }
}