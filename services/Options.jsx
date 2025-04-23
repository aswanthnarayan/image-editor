import { UploadCloud, Settings, WalletIcon, Folder, Home, Image, LayoutTemplate, ShapesIcon, Sparkle, Component, Type } from "lucide-react";
import BackgroundSettings from "./Components/BackgroundSettings";

export const SidebarItems = [
  {
    label: "Home",component: <></>,
    icon: <Home />,
    path: "/workspace",
  },
  { icon: <Image />, label: "Projects", path: "/workspace/projects" },
  { icon: <Folder />, label: "Templates", path: "/workspace/templates" },
  { icon: <WalletIcon />, label: "Billing", path: "/workspace/billing" },
  { icon: <UploadCloud />, label: "Uploads", path: "/workspace/uploads" },
  { icon: <Settings />, label: "Settings", path: "/workspace/settings" },
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
  },
  {
      name: 'Elements',
      desc: 'Select Shapes and Stickers',
      icon: ShapesIcon,
  },
  {
      name: 'Images',
      desc: 'Add Image or Upload your own',
      icon: Image,
  },
  {
      name: 'Text',
      desc: 'Add Text and Heading',
      icon: Type,
  },
  {
      name: 'AI',
      desc: 'More AI Feature to enhance your design',
      icon: Sparkle,
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
      icon: Settings
  }
]
