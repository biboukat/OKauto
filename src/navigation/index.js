import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HeroesScreen from '~/ui/screens/heroes';
import EpisodesScreen from '~/ui/screens/episodes';
import CharacterInfoScreen from '~/ui/screens/characterInfo';

const CharacterStack = createStackNavigator({
  Heroes: {
    screen: HeroesScreen,
  },
  CharacterInfo: {
    screen: CharacterInfoScreen,
  },
});

const EpisodesStack = createStackNavigator({
  Episodes: {
    screen: EpisodesScreen,
  },
  CharacterInfo: {
    screen: CharacterInfoScreen,
  },
});

const tabBar = createBottomTabNavigator(
  {
    Heroes: {
      screen: CharacterStack,
    },
    Episodes: {
      screen: EpisodesStack,
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
