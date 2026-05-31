import { Schema, SchemaType } from '@google/generative-ai'

// Schema for BlockStyleProps
const blockStylePropsSchema: Schema = {
  type: SchemaType.OBJECT,
  description: "Styling properties mapped to CSS",
  properties: {
    display: { type: SchemaType.STRING, enum: ['flex', 'grid', 'block', 'none'] },
    flexDirection: { type: SchemaType.STRING, enum: ['row', 'column'] },
    justifyContent: { type: SchemaType.STRING },
    alignItems: { type: SchemaType.STRING },
    gap: { type: SchemaType.STRING },
    padding: { type: SchemaType.STRING },
    margin: { type: SchemaType.STRING },
    width: { type: SchemaType.STRING },
    height: { type: SchemaType.STRING },
    backgroundColor: { type: SchemaType.STRING },
    color: { type: SchemaType.STRING },
    borderRadius: { type: SchemaType.STRING },
    fontSize: { type: SchemaType.STRING },
    fontWeight: { type: SchemaType.STRING },
    textAlign: { type: SchemaType.STRING, enum: ['left', 'center', 'right'] },
    boxShadow: { type: SchemaType.STRING },
  }
}

// Due to Gemini API limitations with deep recursion in Schema, we define up to 3 levels of depth
const leafNodeSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    type: { type: SchemaType.STRING, enum: ['Typography', 'Image', 'Button', 'Icon', 'Spacer'] },
    className: { type: SchemaType.STRING },
    styles: blockStylePropsSchema,
    typographyProps: {
      type: SchemaType.OBJECT,
      properties: {
        variant: { type: SchemaType.STRING },
        content: { type: SchemaType.STRING },
        dynamicContentPath: { type: SchemaType.STRING }
      }
    },
    imageProps: {
      type: SchemaType.OBJECT,
      properties: {
        src: { type: SchemaType.STRING },
        alt: { type: SchemaType.STRING },
        dynamicSrcPath: { type: SchemaType.STRING }
      }
    },
    buttonProps: {
      type: SchemaType.OBJECT,
      properties: {
        action: { type: SchemaType.STRING, enum: ['link', 'submit'] },
        href: { type: SchemaType.STRING },
        content: { type: SchemaType.STRING }
      }
    },
    iconProps: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING },
        size: { type: SchemaType.STRING },
        color: { type: SchemaType.STRING }
      }
    }
  },
  required: ['id', 'type']
}

const level2NodeSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    type: { type: SchemaType.STRING, enum: ['Box', 'Flex', 'Grid'] },
    className: { type: SchemaType.STRING },
    styles: blockStylePropsSchema,
    children: {
      type: SchemaType.ARRAY,
      items: leafNodeSchema
    }
  },
  required: ['id', 'type']
}

const level1NodeSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    type: { type: SchemaType.STRING, enum: ['Box', 'Flex', 'Grid'] },
    className: { type: SchemaType.STRING },
    styles: blockStylePropsSchema,
    children: {
      type: SchemaType.ARRAY,
      items: level2NodeSchema
    }
  },
  required: ['id', 'type']
}

export const themeConfigSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    name: { type: SchemaType.STRING, description: "Benzersiz bir tema adı üret (Örn: Modern Berber)" },
    isDark: { type: SchemaType.BOOLEAN, description: "Tema karanlık mod mu?" },
    cssVariables: {
      type: SchemaType.OBJECT,
      description: "Temel CSS değişkenleri (örn: --color-bg, --color-accent vb.)",
      properties: {
        "--color-bg": { type: SchemaType.STRING },
        "--color-text": { type: SchemaType.STRING },
        "--color-accent": { type: SchemaType.STRING },
        "--color-text-on-accent": { type: SchemaType.STRING }
      },
      required: ["--color-bg", "--color-text", "--color-accent"]
    },
    designTokens: {
      type: SchemaType.OBJECT,
      description: "Sektöre ve tasarıma özel token değerleri",
      properties: {
        spacing: { type: SchemaType.OBJECT, properties: { md: { type: SchemaType.STRING }, lg: { type: SchemaType.STRING }, xl: { type: SchemaType.STRING } } },
        radius: { type: SchemaType.OBJECT, properties: { md: { type: SchemaType.STRING }, lg: { type: SchemaType.STRING } } },
        shadows: { type: SchemaType.OBJECT, properties: { md: { type: SchemaType.STRING }, lg: { type: SchemaType.STRING } } },
      }
    },
    pages: {
      type: SchemaType.ARRAY,
      description: "Sitenin sayfaları (genellikle sadece Ana Sayfa)",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          slug: { type: SchemaType.STRING },
          title: { type: SchemaType.STRING },
          isHomePage: { type: SchemaType.BOOLEAN },
          sections: {
            type: SchemaType.ARRAY,
            description: "Sayfadaki bloklar (Hero, Hakkımızda, Hizmetler vb.)",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: { type: SchemaType.STRING },
                type: { type: SchemaType.STRING },
                order: { type: SchemaType.NUMBER },
                blockTree: level1NodeSchema // AST ağacı root düğümü
              },
              required: ["id", "type", "blockTree"]
            }
          }
        },
        required: ["id", "slug", "title", "sections"]
      }
    }
  },
  required: ["name", "isDark", "cssVariables", "pages"]
}
