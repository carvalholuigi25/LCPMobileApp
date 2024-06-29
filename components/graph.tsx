// Loading.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { StackedBarChartData } from 'react-native-chart-kit/dist/StackedBarChart';
import { Button } from 'react-native-paper';


const Graph: React.FC<any> = () => {
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
    <View style={[styles.container, styles.mgraph]}>
      <View style={styles.graph}>
      <StackedBarChart data={datagraph} segments={3} width={screenWidth} height={300} yAxisLabel="" yAxisSuffix='%' chartConfig={chartConfig} fromZero={false} style={styles.graph} hideLegend={true} />
      </View>
      <Button mode="contained" onPress={refresh_data} style={{ marginTop: 15 }}>Refresh</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default Graph;
