export interface Menu {
  id: string; // Todo: Add a type list for the menu item
  children: {
    id: string;
    icon: React.ReactNode;
    active?: boolean;
  }[];
}
