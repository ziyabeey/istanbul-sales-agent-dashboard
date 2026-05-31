// @ts-nocheck
import { BlockNode } from '../types/ast-types'

export const PILOT_AST: BlockNode = {
  id: 'root-hero',
  type: 'Box',
  className: 'relative flex items-center min-h-[80vh]',
  styles: {
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: 'var(--spacing-2xl, 80px) 0'
  },
  children: [
    {
      id: 'container',
      type: 'Flex',
      className: 'container px-4 mx-auto',
      styles: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3rem',
        flexWrap: 'wrap'
      },
      children: [
        {
          id: 'left-col',
          type: 'Flex',
          styles: {
            flexDirection: 'column',
            width: '100%',
            maxWidth: '600px',
            gap: '1.5rem'
          },
          children: [
            {
              id: 'badge',
              type: 'Typography',
              typographyProps: { variant: 'span', content: 'AST ENGINE V2 AKTİF' },
              styles: {
                backgroundColor: 'var(--color-accent-subtle, #f0fdf4)',
                color: 'var(--color-accent, #16a34a)',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
                width: 'fit-content'
              }
            },
            {
              id: 'title',
              type: 'Typography',
              typographyProps: { variant: 'h1', dynamicContentPath: 'business.name' },
              styles: {
                fontSize: '4rem',
                fontWeight: 900,
                lineHeight: 1.1,
                fontFamily: 'var(--font-heading)'
              }
            },
            {
              id: 'subtitle',
              type: 'Typography',
              typographyProps: { variant: 'p', dynamicContentPath: 'business.slogan' },
              styles: {
                fontSize: '1.5rem',
                color: 'var(--color-text-secondary, #6b7280)'
              }
            },
            {
              id: 'cta-button',
              type: 'Button',
              buttonProps: { action: 'link', href: '#randevu', content: 'Randevu Al' },
              styles: {
                backgroundColor: 'var(--color-accent, #000)',
                color: 'var(--color-text-on-accent, #fff)',
                padding: '1rem 2.5rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                width: 'fit-content',
                marginTop: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }
            }
          ]
        },
        {
          id: 'right-col',
          type: 'Box',
          styles: {
            flex: '1 1 0%',
            minWidth: '300px'
          },
          children: [
            {
              id: 'hero-image',
              type: 'Image',
              imageProps: { dynamicSrcPath: 'business.photos.0.url' },
              styles: {
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }
            }
          ]
        }
      ]
    }
  ]
}
