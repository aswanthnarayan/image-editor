import { UploadCloud, Settings,WalletIcon,BookType, Folder, Home, Image, Palette,LayoutTemplate, ShapesIcon, Sparkle, Component, Type,Square,Minus,Blend,SquareRoundCorner,ArrowUp,ArrowDown } from "lucide-react";
import BackgroundSettings from "./Components/BackgroundSettings";
import AddImageSettings from "./Components/AddImageSettings";
import Elements from "./Components/Elements";
import BorderRadius from "./Sharable/BorderRadius";
import FillColor from "./Sharable/FillColor";
import BorderColor from "./Sharable/BorderColor";
import BorderWidth from "./Sharable/BorderWidth";
import Opacity from "./Sharable/Opacity";
import AiTransformation from "./Components/AiTransformation";
import TextSettings from "./Components/TextSettings";
import FontFamily from "./Sharable/FontFamily";
import TemplateList from "./Components/TemplateList";
import DesignSettings from "./Sharable/DesignSettings";


export const SidebarItems = [
  {
    label: "Home",component: <></>,
    icon: <Home />,
    path: "/workspace",
  },
  { icon: <Image />, label: "Projects", path: "/workspace/projects" ,path: "/workspace/projects" },
  { icon: <Folder />, label: "Templates", path: "/workspace/templates" ,path: "/workspace/templates" },
  { icon: <WalletIcon />, label: "Billing", path: "/workspace/billing" ,path: "/workspace/billing" },
//   { icon: <Settings />, label: "Settings", path: "/workspace/settings" ,path: "/workspace/settings" },
];

export const canvasSizeOptions = [
  {
      name: 'Instagram Post',
      width: 500,
      height: 500,
      icon: '/instagram.png'
  },
  {
      name: 'Instagram Story',
      width: 473,
      height: 700,
      icon: '/instagram.png'
  },
  {
      name: 'YouTube Thumbnail',
      width: 700,
      height: 394,
      icon: '/youtube.png'
  },
  {
      name: 'YouTube Banner',
      width: 700,
      height: 394,
      icon: '/youtube-2.png'
  },
  {
      name: 'YouTube Post',
      width: 500,
      height: 500,
      icon: '/youtube.png'
  },
  {
      name: 'PowerPoint Slide',
      width: 700,
      height: 394,
      icon: '/ppt.png'
  },
  {
      name: 'Flyer (A4)',
      width: 508,
      height: 700,
      icon: '/circle.png'
  },
  {
      name: 'Facebook Post',
      width: 700,
      height: 368,
      icon: '/facebook.png'
  },
  {
      name: 'Twitter Post',
      width: 700,
      height: 394,
      icon: '/twitter.png'
  },
  {
      name: 'LinkedIn Post',
      width: 700,
      height: 366,
      icon: '/linkedin.png'
  },
  {
      name: 'Pinterest Pin',
      width: 467,
      height: 700,
      icon: '/pinterest.png'
  },
];

export const sideBarMenu = [
  {
      name: 'Templates',
      desc: 'Select Prebuild Template',
      icon: LayoutTemplate,
      component: <TemplateList />
  },
  {
      name: 'Elements',
      desc: 'Select Shapes and Stickers',
      icon: ShapesIcon,
      component: <Elements />
  },
  {
      name: 'Images',
      desc: 'Add Image or Upload your own',
      icon: Image,
      component: <AddImageSettings />
  },
  {
      name: 'Text',
      desc: 'Add Text and Heading',
      icon: Type,
      component:<TextSettings/>
  },
  {
      name: 'AI',
      desc: 'More AI Feature to enhance your design',
      icon: Sparkle,
      component: <AiTransformation/>
  },
  {
      name: 'Background',
      desc: 'Change Canvas Background',
      icon: Component,
      component: <BackgroundSettings />
  },
  {
      name: 'Settings',
      desc: 'Update Canvas Size and background',
      icon: Settings,
      component: <DesignSettings/>
  }
]

export const ShapeList = [
    {
        name: 'Circle',
        icon: '/moon.png'
    },
    {
        name: 'Square',
        icon: '/square.png'
    },
    {
        name: 'Trangle',
        icon: '/trangle.png'
    },
    {
        name: 'Line',
        icon: '/line.png'
    }
]

export const shapesSettingsList = [
    {
        name: 'Fill',
        icon: Palette,
        component: <FillColor />
    },
    { 
        name: 'Stroke Color',
        icon: Square,
        component: <BorderColor />
    },
    {
        name: 'Stroke Width',
        icon: Minus,
        component: <BorderWidth />
    },
    {
        name: 'Opacity',
        icon: Blend,
        component: <Opacity />
    },
    {
        name: 'Rounded Corner',
        icon: SquareRoundCorner,
        component: <BorderRadius />
    },

]

export const AITransformationSettings = [
    {
        name: 'Background Remove',
        command: 'e-bgremove',
        image: '/remove-bg.jpg'
    },
    {
        name: 'Change Background',
        command: 'e-changebg-prompt-snow',
        image: '/change-bg.jpg',
        input: true
    },
    {
        name: 'Generative fill',
        command: 'bg-genfill,w-1000,h-960,cm-pad_resize',
        image: '/generative-fill.png'
    },
    {
        name: 'AI drop shadow',
        command: 'e-dropshadow',
        image: '/shadow.jpeg'
    },
    {
        name: 'Upscale',
        command: 'e-upscale',
        image: '/upscale.png'
    },
    {
        name: 'Smart crop',
        command: 'fo-auto',
        image: '/smartcrop.png'
    },
    {
        name: 'Contrast',
        command: 'e-contrast',
        image: '/e-contrast.png'
    },
    {
        name: 'Grayscale',
        command: 'e-grayscale',
        image: '/grayscale.png'
    },
    {
        name: 'Blur',
        command: 'bl-10',
        image: '/e-blur.png'
    },
    {
        name: 'Flip',
        command: 'e-flip',
        image: '/e-flip.png'
    }
]

export const FontFamilyList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]

export const TextSettingsList = [
    {
        name: 'Fill',
        icon: Palette,
        component: <FillColor />
    },
    {
        name: 'Stroke Color',
        icon: Square,
        component: <BorderColor />
    },
    {
        name: 'Stroke Width',
        icon: Minus,
        component: <BorderWidth />
    },
    {
        name: 'Opacity',
        icon: Blend,
        component: <Opacity />
    },
    {
        name: 'Font',
        icon: BookType,
        component: <FontFamily />
    },
   
]

export const StickerList = [
    'https://cdn-icons-png.flaticon.com/256/428/428094.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111463.png',
    'https://cdn-icons-png.flaticon.com/256/5968/5968764.png',
    'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
    'https://cdn-icons-png.flaticon.com/256/733/733585.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111646.png',
    'https://cdn-icons-png.flaticon.com/256/4494/4494477.png',
    'https://cdn-icons-png.flaticon.com/256/281/281764.png',
    'https://cdn-icons-png.flaticon.com/256/1409/1409941.png',
    'https://cdn-icons-png.flaticon.com/256/10851/10851235.png',
    'https://cdn-icons-png.flaticon.com/256/520/520460.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791311.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791320.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791292.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791355.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791307.png',
    'https://cdn-icons-png.flaticon.com/256/7996/7996409.png',
    'https://cdn-icons-png.flaticon.com/256/8760/8760748.png',
    'https://cdn-icons-png.flaticon.com/256/5171/5171530.png',
    'https://cdn-icons-png.flaticon.com/256/5175/5175169.png',
    'https://cdn-icons-png.flaticon.com/256/7096/7096435.png',
    'https://cdn-icons-png.flaticon.com/256/346/346167.png',
    'https://cdn-icons-png.flaticon.com/256/1776/1776968.png',
    'https://cdn-icons-png.flaticon.com/256/1497/1497177.png',
    'https://cdn-icons-png.flaticon.com/256/2517/2517029.png',
    'https://cdn-icons-png.flaticon.com/256/2276/2276906.png',
    'https://cdn-icons-png.flaticon.com/256/6604/6604292.png',
    'https://cdn-icons-png.flaticon.com/256/6010/6010131.png',
    'https://cdn-icons-png.flaticon.com/256/11167/11167978.png',
    'https://cdn-icons-png.flaticon.com/256/11145/11145432.png',
    'https://cdn-icons-png.flaticon.com/256/7645/7645528.png',
    'https://cdn-icons-png.flaticon.com/256/16116/16116383.png',
    'https://cdn-icons-png.flaticon.com/256/639/639373.png'
]