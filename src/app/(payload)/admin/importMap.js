import { CustomSlugField as CustomSlugField_0 } from '@contentql/core/client'
import { RichTextCell as RichTextCell_1 } from '@payloadcms/richtext-slate/client'
import { RichTextField as RichTextField_2 } from '@payloadcms/richtext-slate/client'
import { getGenerateComponentMap as getGenerateComponentMap_3 } from '@payloadcms/richtext-slate/generateComponentMap'
import { BoldLeafButton as BoldLeafButton_4 } from '@payloadcms/richtext-slate/client'
import { BoldLeaf as BoldLeaf_5 } from '@payloadcms/richtext-slate/client'
import { CodeLeafButton as CodeLeafButton_6 } from '@payloadcms/richtext-slate/client'
import { CodeLeaf as CodeLeaf_7 } from '@payloadcms/richtext-slate/client'
import { ItalicLeafButton as ItalicLeafButton_8 } from '@payloadcms/richtext-slate/client'
import { ItalicLeaf as ItalicLeaf_9 } from '@payloadcms/richtext-slate/client'
import { StrikethroughLeafButton as StrikethroughLeafButton_10 } from '@payloadcms/richtext-slate/client'
import { StrikethroughLeaf as StrikethroughLeaf_11 } from '@payloadcms/richtext-slate/client'
import { UnderlineLeafButton as UnderlineLeafButton_12 } from '@payloadcms/richtext-slate/client'
import { UnderlineLeaf as UnderlineLeaf_13 } from '@payloadcms/richtext-slate/client'
import { default as default_14 } from 'src/payload/slate/strong/Button'
import { default as default_15 } from 'src/payload/slate/strong/Leaf'
import { default as default_16 } from 'src/payload/slate/pre/Button'
import { default as default_17 } from 'src/payload/slate/pre/Leaf'
import { default as default_18 } from 'src/payload/slate/mark/Button'
import { default as default_19 } from 'src/payload/slate/mark/Leaf'
import { default as default_20 } from 'src/payload/slate/kbd/Button'
import { default as default_21 } from 'src/payload/slate/kbd/Leaf'
import { default as default_22 } from 'src/payload/slate/custom-iframe/Button'
import { default as default_23 } from 'src/payload/slate/custom-iframe/Leaf'
import { default as default_24 } from 'src/payload/slate/italic/Button'
import { default as default_25 } from 'src/payload/slate/italic/Leaf'
import { default as default_26 } from 'src/payload/slate/Strikethrough/Button'
import { default as default_27 } from 'src/payload/slate/Strikethrough/Leaf'
import { default as default_28 } from 'src/payload/slate/underline/Button'
import { default as default_29 } from 'src/payload/slate/underline/Leaf'
import { BlockquoteElementButton as BlockquoteElementButton_30 } from '@payloadcms/richtext-slate/client'
import { BlockquoteElement as BlockquoteElement_31 } from '@payloadcms/richtext-slate/client'
import { H1ElementButton as H1ElementButton_32 } from '@payloadcms/richtext-slate/client'
import { Heading1Element as Heading1Element_33 } from '@payloadcms/richtext-slate/client'
import { H2ElementButton as H2ElementButton_34 } from '@payloadcms/richtext-slate/client'
import { Heading2Element as Heading2Element_35 } from '@payloadcms/richtext-slate/client'
import { H3ElementButton as H3ElementButton_36 } from '@payloadcms/richtext-slate/client'
import { Heading3Element as Heading3Element_37 } from '@payloadcms/richtext-slate/client'
import { H4ElementButton as H4ElementButton_38 } from '@payloadcms/richtext-slate/client'
import { Heading4Element as Heading4Element_39 } from '@payloadcms/richtext-slate/client'
import { H5ElementButton as H5ElementButton_40 } from '@payloadcms/richtext-slate/client'
import { Heading5Element as Heading5Element_41 } from '@payloadcms/richtext-slate/client'
import { H6ElementButton as H6ElementButton_42 } from '@payloadcms/richtext-slate/client'
import { Heading6Element as Heading6Element_43 } from '@payloadcms/richtext-slate/client'
import { IndentButton as IndentButton_44 } from '@payloadcms/richtext-slate/client'
import { IndentElement as IndentElement_45 } from '@payloadcms/richtext-slate/client'
import { ListItemElement as ListItemElement_46 } from '@payloadcms/richtext-slate/client'
import { LinkButton as LinkButton_47 } from '@payloadcms/richtext-slate/client'
import { LinkElement as LinkElement_48 } from '@payloadcms/richtext-slate/client'
import { WithLinks as WithLinks_49 } from '@payloadcms/richtext-slate/client'
import { OLElementButton as OLElementButton_50 } from '@payloadcms/richtext-slate/client'
import { OrderedListElement as OrderedListElement_51 } from '@payloadcms/richtext-slate/client'
import { RelationshipButton as RelationshipButton_52 } from '@payloadcms/richtext-slate/client'
import { RelationshipElement as RelationshipElement_53 } from '@payloadcms/richtext-slate/client'
import { WithRelationship as WithRelationship_54 } from '@payloadcms/richtext-slate/client'
import { TextAlignElementButton as TextAlignElementButton_55 } from '@payloadcms/richtext-slate/client'
import { ULElementButton as ULElementButton_56 } from '@payloadcms/richtext-slate/client'
import { UnorderedListElement as UnorderedListElement_57 } from '@payloadcms/richtext-slate/client'
import { UploadElementButton as UploadElementButton_58 } from '@payloadcms/richtext-slate/client'
import { UploadElement as UploadElement_59 } from '@payloadcms/richtext-slate/client'
import { WithUpload as WithUpload_60 } from '@payloadcms/richtext-slate/client'
import { CustomPublishOnFieldLabel as CustomPublishOnFieldLabel_61 } from '@contentql/core/client'
import { CustomPublishOnField as CustomPublishOnField_62 } from '@contentql/core/client'
import { OverviewComponent as OverviewComponent_63 } from '@payloadcms/plugin-seo/client'
import { MetaTitleComponent as MetaTitleComponent_64 } from '@payloadcms/plugin-seo/client'
import { MetaDescriptionComponent as MetaDescriptionComponent_65 } from '@payloadcms/plugin-seo/client'
import { MetaImageComponent as MetaImageComponent_66 } from '@payloadcms/plugin-seo/client'
import { PreviewComponent as PreviewComponent_67 } from '@payloadcms/plugin-seo/client'
import { CustomPathField as CustomPathField_68 } from '@contentql/core/client'
import { LinkToDoc as LinkToDoc_69 } from '@payloadcms/plugin-search/client'
import { default as default_70 } from 'src/payload/style/icons/Icon.tsx'
import { default as default_71 } from 'src/payload/style/icons/Logo.tsx'

export const importMap = {
  "@contentql/core/client#CustomSlugField": CustomSlugField_0,
  "@payloadcms/richtext-slate/client#RichTextCell": RichTextCell_1,
  "@payloadcms/richtext-slate/client#RichTextField": RichTextField_2,
  "@payloadcms/richtext-slate/generateComponentMap#getGenerateComponentMap": getGenerateComponentMap_3,
  "@payloadcms/richtext-slate/client#BoldLeafButton": BoldLeafButton_4,
  "@payloadcms/richtext-slate/client#BoldLeaf": BoldLeaf_5,
  "@payloadcms/richtext-slate/client#CodeLeafButton": CodeLeafButton_6,
  "@payloadcms/richtext-slate/client#CodeLeaf": CodeLeaf_7,
  "@payloadcms/richtext-slate/client#ItalicLeafButton": ItalicLeafButton_8,
  "@payloadcms/richtext-slate/client#ItalicLeaf": ItalicLeaf_9,
  "@payloadcms/richtext-slate/client#StrikethroughLeafButton": StrikethroughLeafButton_10,
  "@payloadcms/richtext-slate/client#StrikethroughLeaf": StrikethroughLeaf_11,
  "@payloadcms/richtext-slate/client#UnderlineLeafButton": UnderlineLeafButton_12,
  "@payloadcms/richtext-slate/client#UnderlineLeaf": UnderlineLeaf_13,
  "src/payload/slate/strong/Button#default": default_14,
  "src/payload/slate/strong/Leaf#default": default_15,
  "src/payload/slate/pre/Button#default": default_16,
  "src/payload/slate/pre/Leaf#default": default_17,
  "src/payload/slate/mark/Button#default": default_18,
  "src/payload/slate/mark/Leaf#default": default_19,
  "src/payload/slate/kbd/Button#default": default_20,
  "src/payload/slate/kbd/Leaf#default": default_21,
  "src/payload/slate/custom-iframe/Button#default": default_22,
  "src/payload/slate/custom-iframe/Leaf#default": default_23,
  "src/payload/slate/italic/Button#default": default_24,
  "src/payload/slate/italic/Leaf#default": default_25,
  "src/payload/slate/Strikethrough/Button#default": default_26,
  "src/payload/slate/Strikethrough/Leaf#default": default_27,
  "src/payload/slate/underline/Button#default": default_28,
  "src/payload/slate/underline/Leaf#default": default_29,
  "@payloadcms/richtext-slate/client#BlockquoteElementButton": BlockquoteElementButton_30,
  "@payloadcms/richtext-slate/client#BlockquoteElement": BlockquoteElement_31,
  "@payloadcms/richtext-slate/client#H1ElementButton": H1ElementButton_32,
  "@payloadcms/richtext-slate/client#Heading1Element": Heading1Element_33,
  "@payloadcms/richtext-slate/client#H2ElementButton": H2ElementButton_34,
  "@payloadcms/richtext-slate/client#Heading2Element": Heading2Element_35,
  "@payloadcms/richtext-slate/client#H3ElementButton": H3ElementButton_36,
  "@payloadcms/richtext-slate/client#Heading3Element": Heading3Element_37,
  "@payloadcms/richtext-slate/client#H4ElementButton": H4ElementButton_38,
  "@payloadcms/richtext-slate/client#Heading4Element": Heading4Element_39,
  "@payloadcms/richtext-slate/client#H5ElementButton": H5ElementButton_40,
  "@payloadcms/richtext-slate/client#Heading5Element": Heading5Element_41,
  "@payloadcms/richtext-slate/client#H6ElementButton": H6ElementButton_42,
  "@payloadcms/richtext-slate/client#Heading6Element": Heading6Element_43,
  "@payloadcms/richtext-slate/client#IndentButton": IndentButton_44,
  "@payloadcms/richtext-slate/client#IndentElement": IndentElement_45,
  "@payloadcms/richtext-slate/client#ListItemElement": ListItemElement_46,
  "@payloadcms/richtext-slate/client#LinkButton": LinkButton_47,
  "@payloadcms/richtext-slate/client#LinkElement": LinkElement_48,
  "@payloadcms/richtext-slate/client#WithLinks": WithLinks_49,
  "@payloadcms/richtext-slate/client#OLElementButton": OLElementButton_50,
  "@payloadcms/richtext-slate/client#OrderedListElement": OrderedListElement_51,
  "@payloadcms/richtext-slate/client#RelationshipButton": RelationshipButton_52,
  "@payloadcms/richtext-slate/client#RelationshipElement": RelationshipElement_53,
  "@payloadcms/richtext-slate/client#WithRelationship": WithRelationship_54,
  "@payloadcms/richtext-slate/client#TextAlignElementButton": TextAlignElementButton_55,
  "@payloadcms/richtext-slate/client#ULElementButton": ULElementButton_56,
  "@payloadcms/richtext-slate/client#UnorderedListElement": UnorderedListElement_57,
  "@payloadcms/richtext-slate/client#UploadElementButton": UploadElementButton_58,
  "@payloadcms/richtext-slate/client#UploadElement": UploadElement_59,
  "@payloadcms/richtext-slate/client#WithUpload": WithUpload_60,
  "@contentql/core/client#CustomPublishOnFieldLabel": CustomPublishOnFieldLabel_61,
  "@contentql/core/client#CustomPublishOnField": CustomPublishOnField_62,
  "@payloadcms/plugin-seo/client#OverviewComponent": OverviewComponent_63,
  "@payloadcms/plugin-seo/client#MetaTitleComponent": MetaTitleComponent_64,
  "@payloadcms/plugin-seo/client#MetaDescriptionComponent": MetaDescriptionComponent_65,
  "@payloadcms/plugin-seo/client#MetaImageComponent": MetaImageComponent_66,
  "@payloadcms/plugin-seo/client#PreviewComponent": PreviewComponent_67,
  "@contentql/core/client#CustomPathField": CustomPathField_68,
  "@payloadcms/plugin-search/client#LinkToDoc": LinkToDoc_69,
  "/src/payload/style/icons/Icon.tsx#default": default_70,
  "/src/payload/style/icons/Logo.tsx#default": default_71
}
