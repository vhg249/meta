import blog_icon from "@Assets/images/blog.png";
import global_icon from "@Assets/images/global.png";
import shop_icon from "@Assets/images/shop.png";
import profile_icon from "@Assets/images/profile-circle.png";
import bubble_icon from "@Assets/images/bubble.png";

export let sidebar = [
  {
    name: "Blog",
    link: "",
    icon: blog_icon,
  },
  {
    name: "360 Tour",
    link: "project",
    icon: global_icon,
  },
  {
    name: "Lands",
    link: "land",
    icon: shop_icon,
    showChildren: false,
    children: [
      { name: "All NFTs", link: "land" },
      // { name: "Post", link: "land/posted" },
    ],
  },
  {
    name: "Account",
    link: "account",
    icon: profile_icon,
    showChildren: false,
    children: [
      { name: "All Accounts", link: "account" },
      { name: "Blocked Accounts ", link: "account" },
    ],
  },
];
