import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "../app/index";

const DrawerObject = createDrawerNavigator();

export function Drawer() {
  return (
    <DrawerObject.Navigator>
      <DrawerObject.Screen name="Index" component={Index} />
    </DrawerObject.Navigator>
  );
}
