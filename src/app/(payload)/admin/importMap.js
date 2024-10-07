import { OverviewComponent as OverviewComponent_0 } from '@payloadcms/plugin-seo/client'
import { MetaTitleComponent as MetaTitleComponent_1 } from '@payloadcms/plugin-seo/client'
import { MetaDescriptionComponent as MetaDescriptionComponent_2 } from '@payloadcms/plugin-seo/client'
import { MetaImageComponent as MetaImageComponent_3 } from '@payloadcms/plugin-seo/client'
import { PreviewComponent as PreviewComponent_4 } from '@payloadcms/plugin-seo/client'
import { CustomSlugModeField as CustomSlugModeField_5 } from '@contentql/core/client'
import { CustomSlugField as CustomSlugField_6 } from '@contentql/core/client'
import { CustomPathField as CustomPathField_7 } from '@contentql/core/client'
import { RichTextCell as RichTextCell_8 } from '@payloadcms/richtext-slate/client'
import { RichTextField as RichTextField_9 } from '@payloadcms/richtext-slate/client'
import { getGenerateComponentMap as getGenerateComponentMap_10 } from '@payloadcms/richtext-slate/generateComponentMap'
import { BoldLeafButton as BoldLeafButton_11 } from '@payloadcms/richtext-slate/client'
import { BoldLeaf as BoldLeaf_12 } from '@payloadcms/richtext-slate/client'
import { CodeLeafButton as CodeLeafButton_13 } from '@payloadcms/richtext-slate/client'
import { CodeLeaf as CodeLeaf_14 } from '@payloadcms/richtext-slate/client'
import { ItalicLeafButton as ItalicLeafButton_15 } from '@payloadcms/richtext-slate/client'
import { ItalicLeaf as ItalicLeaf_16 } from '@payloadcms/richtext-slate/client'
import { StrikethroughLeafButton as StrikethroughLeafButton_17 } from '@payloadcms/richtext-slate/client'
import { StrikethroughLeaf as StrikethroughLeaf_18 } from '@payloadcms/richtext-slate/client'
import { UnderlineLeafButton as UnderlineLeafButton_19 } from '@payloadcms/richtext-slate/client'
import { UnderlineLeaf as UnderlineLeaf_20 } from '@payloadcms/richtext-slate/client'
import { default as default_21 } from 'src/payload/slate/strong/Button'
import { default as default_22 } from 'src/payload/slate/strong/Leaf'
import { default as default_23 } from 'src/payload/slate/pre/Button'
import { default as default_24 } from 'src/payload/slate/pre/Leaf'
import { default as default_25 } from 'src/payload/slate/mark/Button'
import { default as default_26 } from 'src/payload/slate/mark/Leaf'
import { default as default_27 } from 'src/payload/slate/kbd/Button'
import { default as default_28 } from 'src/payload/slate/kbd/Leaf'
import { default as default_29 } from 'src/payload/slate/custom-iframe/Button'
import { default as default_30 } from 'src/payload/slate/custom-iframe/Leaf'
import { default as default_31 } from 'src/payload/slate/italic/Button'
import { default as default_32 } from 'src/payload/slate/italic/Leaf'
import { default as default_33 } from 'src/payload/slate/Strikethrough/Button'
import { default as default_34 } from 'src/payload/slate/Strikethrough/Leaf'
import { default as default_35 } from 'src/payload/slate/underline/Button'
import { default as default_36 } from 'src/payload/slate/underline/Leaf'
import { BlockquoteElementButton as BlockquoteElementButton_37 } from '@payloadcms/richtext-slate/client'
import { BlockquoteElement as BlockquoteElement_38 } from '@payloadcms/richtext-slate/client'
import { H1ElementButton as H1ElementButton_39 } from '@payloadcms/richtext-slate/client'
import { Heading1Element as Heading1Element_40 } from '@payloadcms/richtext-slate/client'
import { H2ElementButton as H2ElementButton_41 } from '@payloadcms/richtext-slate/client'
import { Heading2Element as Heading2Element_42 } from '@payloadcms/richtext-slate/client'
import { H3ElementButton as H3ElementButton_43 } from '@payloadcms/richtext-slate/client'
import { Heading3Element as Heading3Element_44 } from '@payloadcms/richtext-slate/client'
import { H4ElementButton as H4ElementButton_45 } from '@payloadcms/richtext-slate/client'
import { Heading4Element as Heading4Element_46 } from '@payloadcms/richtext-slate/client'
import { H5ElementButton as H5ElementButton_47 } from '@payloadcms/richtext-slate/client'
import { Heading5Element as Heading5Element_48 } from '@payloadcms/richtext-slate/client'
import { H6ElementButton as H6ElementButton_49 } from '@payloadcms/richtext-slate/client'
import { Heading6Element as Heading6Element_50 } from '@payloadcms/richtext-slate/client'
import { IndentButton as IndentButton_51 } from '@payloadcms/richtext-slate/client'
import { IndentElement as IndentElement_52 } from '@payloadcms/richtext-slate/client'
import { ListItemElement as ListItemElement_53 } from '@payloadcms/richtext-slate/client'
import { LinkButton as LinkButton_54 } from '@payloadcms/richtext-slate/client'
import { LinkElement as LinkElement_55 } from '@payloadcms/richtext-slate/client'
import { WithLinks as WithLinks_56 } from '@payloadcms/richtext-slate/client'
import { OLElementButton as OLElementButton_57 } from '@payloadcms/richtext-slate/client'
import { OrderedListElement as OrderedListElement_58 } from '@payloadcms/richtext-slate/client'
import { RelationshipButton as RelationshipButton_59 } from '@payloadcms/richtext-slate/client'
import { RelationshipElement as RelationshipElement_60 } from '@payloadcms/richtext-slate/client'
import { WithRelationship as WithRelationship_61 } from '@payloadcms/richtext-slate/client'
import { TextAlignElementButton as TextAlignElementButton_62 } from '@payloadcms/richtext-slate/client'
import { ULElementButton as ULElementButton_63 } from '@payloadcms/richtext-slate/client'
import { UnorderedListElement as UnorderedListElement_64 } from '@payloadcms/richtext-slate/client'
import { UploadElementButton as UploadElementButton_65 } from '@payloadcms/richtext-slate/client'
import { UploadElement as UploadElement_66 } from '@payloadcms/richtext-slate/client'
import { WithUpload as WithUpload_67 } from '@payloadcms/richtext-slate/client'
import { CustomPublishOnFieldLabel as CustomPublishOnFieldLabel_68 } from '@contentql/core/client'
import { CustomPublishOnField as CustomPublishOnField_69 } from '@contentql/core/client'
import { LinkToDoc as LinkToDoc_70 } from '@payloadcms/plugin-search/client'
import { default as default_71 } from 'src/payload/style/icons/Icon.tsx'
import { default as default_72 } from 'src/payload/style/icons/Logo.tsx'

export const importMap = {
  "@payloadcms/plugin-seo/client#OverviewComponent": OverviewComponent_0,
  "@payloadcms/plugin-seo/client#MetaTitleComponent": MetaTitleComponent_1,
  "@payloadcms/plugin-seo/client#MetaDescriptionComponent": MetaDescriptionComponent_2,
  "@payloadcms/plugin-seo/client#MetaImageComponent": MetaImageComponent_3,
  "@payloadcms/plugin-seo/client#PreviewComponent": PreviewComponent_4,
  "@contentql/core/client#CustomSlugModeField": CustomSlugModeField_5,
  "@contentql/core/client#CustomSlugField": CustomSlugField_6,
  "@contentql/core/client#CustomPathField": CustomPathField_7,
  "@payloadcms/richtext-slate/client#RichTextCell": RichTextCell_8,
  "@payloadcms/richtext-slate/client#RichTextField": RichTextField_9,
  "@payloadcms/richtext-slate/generateComponentMap#getGenerateComponentMap": getGenerateComponentMap_10,
  "@payloadcms/richtext-slate/client#BoldLeafButton": BoldLeafButton_11,
  "@payloadcms/richtext-slate/client#BoldLeaf": BoldLeaf_12,
  "@payloadcms/richtext-slate/client#CodeLeafButton": CodeLeafButton_13,
  "@payloadcms/richtext-slate/client#CodeLeaf": CodeLeaf_14,
  "@payloadcms/richtext-slate/client#ItalicLeafButton": ItalicLeafButton_15,
  "@payloadcms/richtext-slate/client#ItalicLeaf": ItalicLeaf_16,
  "@payloadcms/richtext-slate/client#StrikethroughLeafButton": StrikethroughLeafButton_17,
  "@payloadcms/richtext-slate/client#StrikethroughLeaf": StrikethroughLeaf_18,
  "@payloadcms/richtext-slate/client#UnderlineLeafButton": UnderlineLeafButton_19,
  "@payloadcms/richtext-slate/client#UnderlineLeaf": UnderlineLeaf_20,
  "src/payload/slate/strong/Button#default": default_21,
  "src/payload/slate/strong/Leaf#default": default_22,
  "src/payload/slate/pre/Button#default": default_23,
  "src/payload/slate/pre/Leaf#default": default_24,
  "src/payload/slate/mark/Button#default": default_25,
  "src/payload/slate/mark/Leaf#default": default_26,
  "src/payload/slate/kbd/Button#default": default_27,
  "src/payload/slate/kbd/Leaf#default": default_28,
  "src/payload/slate/custom-iframe/Button#default": default_29,
  "src/payload/slate/custom-iframe/Leaf#default": default_30,
  "src/payload/slate/italic/Button#default": default_31,
  "src/payload/slate/italic/Leaf#default": default_32,
  "src/payload/slate/Strikethrough/Button#default": default_33,
  "src/payload/slate/Strikethrough/Leaf#default": default_34,
  "src/payload/slate/underline/Button#default": default_35,
  "src/payload/slate/underline/Leaf#default": default_36,
  "@payloadcms/richtext-slate/client#BlockquoteElementButton": BlockquoteElementButton_37,
  "@payloadcms/richtext-slate/client#BlockquoteElement": BlockquoteElement_38,
  "@payloadcms/richtext-slate/client#H1ElementButton": H1ElementButton_39,
  "@payloadcms/richtext-slate/client#Heading1Element": Heading1Element_40,
  "@payloadcms/richtext-slate/client#H2ElementButton": H2ElementButton_41,
  "@payloadcms/richtext-slate/client#Heading2Element": Heading2Element_42,
  "@payloadcms/richtext-slate/client#H3ElementButton": H3ElementButton_43,
  "@payloadcms/richtext-slate/client#Heading3Element": Heading3Element_44,
  "@payloadcms/richtext-slate/client#H4ElementButton": H4ElementButton_45,
  "@payloadcms/richtext-slate/client#Heading4Element": Heading4Element_46,
  "@payloadcms/richtext-slate/client#H5ElementButton": H5ElementButton_47,
  "@payloadcms/richtext-slate/client#Heading5Element": Heading5Element_48,
  "@payloadcms/richtext-slate/client#H6ElementButton": H6ElementButton_49,
  "@payloadcms/richtext-slate/client#Heading6Element": Heading6Element_50,
  "@payloadcms/richtext-slate/client#IndentButton": IndentButton_51,
  "@payloadcms/richtext-slate/client#IndentElement": IndentElement_52,
  "@payloadcms/richtext-slate/client#ListItemElement": ListItemElement_53,
  "@payloadcms/richtext-slate/client#LinkButton": LinkButton_54,
  "@payloadcms/richtext-slate/client#LinkElement": LinkElement_55,
  "@payloadcms/richtext-slate/client#WithLinks": WithLinks_56,
  "@payloadcms/richtext-slate/client#OLElementButton": OLElementButton_57,
  "@payloadcms/richtext-slate/client#OrderedListElement": OrderedListElement_58,
  "@payloadcms/richtext-slate/client#RelationshipButton": RelationshipButton_59,
  "@payloadcms/richtext-slate/client#RelationshipElement": RelationshipElement_60,
  "@payloadcms/richtext-slate/client#WithRelationship": WithRelationship_61,
  "@payloadcms/richtext-slate/client#TextAlignElementButton": TextAlignElementButton_62,
  "@payloadcms/richtext-slate/client#ULElementButton": ULElementButton_63,
  "@payloadcms/richtext-slate/client#UnorderedListElement": UnorderedListElement_64,
  "@payloadcms/richtext-slate/client#UploadElementButton": UploadElementButton_65,
  "@payloadcms/richtext-slate/client#UploadElement": UploadElement_66,
  "@payloadcms/richtext-slate/client#WithUpload": WithUpload_67,
  "@contentql/core/client#CustomPublishOnFieldLabel": CustomPublishOnFieldLabel_68,
  "@contentql/core/client#CustomPublishOnField": CustomPublishOnField_69,
  "@payloadcms/plugin-search/client#LinkToDoc": LinkToDoc_70,
  "/src/payload/style/icons/Icon.tsx#default": default_71,
  "/src/payload/style/icons/Logo.tsx#default": default_72
}
