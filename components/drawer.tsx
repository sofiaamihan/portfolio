import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "../app/index";

const DrawerObject = createDrawerNavigator();

export function Drawer() {
  return (
    <DrawerObject.Navigator>
      <DrawerObject.Screen name="Home" component={Index} />
    </DrawerObject.Navigator>
  );
}
