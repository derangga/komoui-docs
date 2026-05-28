export type Content = {
  image: string;
  code: string;
};
export type Variant = {
  name: string;
  content: Content;
};

export type Component =
  | "accordion"
  | "alert"
  | "alert-dialog"
  | "avatar"
  | "badge"
  | "bottom-sheet"
  | "button"
  | "calendar"
  | "card"
  | "carousel"
  | "chart"
  | "checkbox"
  | "collapsible"
  | "combobox"
  | "data-table"
  | "date-picker"
  | "dialog"
  | "dropdown-menu"
  | "input"
  | "input-otp"
  | "popover"
  | "progress"
  | "radio-group"
  | "select"
  | "sidebar"
  | "skeleton"
  | "slider"
  | "sonner"
  | "spinner"
  | "switch"
  | "tabs";
