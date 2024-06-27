import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import { StackedBarChart } from "react-native-chart-kit";
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { StackedBarChartData } from 'react-native-chart-kit/dist/StackedBarChart';
import { Button } from 'react-native-paper';

export default function MainScreen() {
  const max = 100;
  const [randomData, setRandomData] = useState(Math.random() * max);
  const [randomData2, setRandomData2] = useState(Math.random() * max);
  const [randomData3, setRandomData3] = useState(Math.random() * max);

  const datagraph: StackedBarChartData = {
    labels: ["Websites", "Softwares", "Apps"],
    data: [[randomData, 0, 0], [0, randomData2, 0], [0, 0, randomData3]],
    legend: [],
    barColors: [`#FF0000`, `#00FF00`, `#0000FF`]
  };

  function refresh_data() {
    setRandomData(Math.random() * max);
    setRandomData2(Math.random() * max);
    setRandomData3(Math.random() * max);
  }

  const screenWidth = Dimensions.get("window").width - (15 + 15);

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 1,
    color: () => `rgba(0, 255, 0, 1)`,
    labelColor: () => `rgba(0, 0, 0, 1)`,
    decimalPlaces: 0,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={[styles.container]}>
      <View>
        <Text style={styles.title}>Welcome Luis</Text>
      </View>
      <View style={styles.mgraph}>
        <StackedBarChart data={datagraph} segments={3} width={screenWidth} height={300} yAxisLabel="" yAxisSuffix='%' chartConfig={chartConfig} fromZero={false} style={styles.graph} hideLegend={true} />
        <Button mode="contained" onPress={refresh_data} style={{marginTop: 15}}>Reload</Button>
      </View>
      <View style={styles.mprojects}>
        <Pressable onPress={() => Alert.alert('Websites!', 'Coming soon...')} style={styles.projectsitems}>
          <Text style={styles.projectsitemsct}>0</Text>
          <Image source={require('../../../assets/images/projects/iwebsites.png')} style={styles.projectsitemsimg} width={50} height={50} />
          <Text style={styles.projectsitemstxt}>Websites</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Softwares!', 'Coming soon...')} style={styles.projectsitems}>
          <Text style={styles.projectsitemsct}>0</Text>
          <Image source={require('../../../assets/images/projects/isoftwares.png')} style={styles.projectsitemsimg} width={50} height={50} />
          <Text style={styles.projectsitemstxt}>Softwares</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Apps!', 'Coming soon...')} style={styles.projectsitems}>
          <Text style={styles.projectsitemsct}>0</Text>
          <Image source={require('../../../assets/images/projects/iapps.png')} style={styles.projectsitemsimg} width={50} height={50} />
          <Text style={styles.projectsitemstxt}>Apps</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingVertical: 15
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 25
  },
  text: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#000000',
    lineHeight: 25
  },
  mgraph: {
    marginTop: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  graph: {
    borderRadius: 15,
    borderColor: 'transparent',
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mprojects: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flex: 1,
    flexWrap: 'wrap'
  },
  projectsitems: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    width: 100,
    borderColor: '#47FE1A',
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  projectsitemsimg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  projectsitemstxt: {
    alignItems: 'center',
    fontSize: 14
  },
  projectsitemsct: {
    position: 'absolute',
    top: '-4%',
    right: '-5%',
    bottom: 0,
    backgroundColor: '#47FE1A',
    margin: 'auto',
    padding: 5,
    borderRadius: 10,
    width: 20,
    height: 20,
    fontSize: 10,
    lineHeight: 10,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
  btngetstarted: {
    backgroundColor: '#47FE1A',
    color: '#000000',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowRadius: 15,
    textAlign: 'center',
  },
  btngetstartedtxt: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
    alignItems: 'center',
    padding: 15
  },
  footertxt: {
    color: '#ffffff'
  }
});
