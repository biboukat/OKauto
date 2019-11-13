import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HeroesScreen from '~/ui/screens/heroes';
import EpisodesScreen from '~/ui/screens/episodes';

const tabBar = createBottomTabNavigator(
  {
    Heroes: {
      screen: HeroesScreen,
    },
    Episodes: {
      screen: EpisodesScreen,
    },
  },
  {
    initialRouteName: 'Heroes',
    backBehavior: 'initialRoute',

    navigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(tabBar);
